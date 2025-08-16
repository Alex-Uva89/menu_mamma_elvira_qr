<template>
  <q-page class="bg-stone">
    <div class="container q-pt-lg q-pb-md">
      <div class="text-h5 text-weight-bold text-primary">Seleziona il locale</div>
      <div class="text-caption text-grey-7">Scegli per visualizzare il menu</div>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner size="40px" color="primary" />
    </q-inner-loading>

    <div v-if="!loading && entities.length === 0" class="container q-my-xl">
      <q-banner rounded="0" class="bg-white text-dark">
        Nessun locale disponibile al momento.
      </q-banner>
    </div>

    <div v-else class="container q-pb-xl">
      <q-list separator bordered class="bg-white flat-list">
        <q-item
          v-for="ent in entities"
          :key="ent._id"
          clickable
          @click="goTo(ent)"
          class="q-py-md entity-row"
          :aria-label="`Apri menu di ${ent.name}`"
        >
          <!-- Logo -->
          <q-item-section avatar class="q-pr-lg">
            <div class="logo-box">
              <img v-if="ent.logoUrl" :src="ent.logoUrl" alt="" class="logo-natural" />
              <div v-else class="logo-fallback text-primary">{{ ent.name?.slice(0,1) }}</div>
            </div>
          </q-item-section>

          <!-- Testi -->
          <q-item-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-subtitle1 text-weight-bold">{{ ent.name }}</div>
                <div class="text-caption text-grey-7">{{ ent.address }} · {{ ent.city }}</div>
              </div>
            </div>

            <!-- Chips info -->
            <div class="q-mt-sm row items-center no-wrap chip-row">
              <q-chip
                v-if="ent.serviceCharge"
                square size="sm" outline color="primary" icon="receipt_long" class="q-mr-sm q-mb-sm"
              >
                Coperto €{{ ent.serviceCharge }}
              </q-chip>
              <q-chip
                v-if="ent.glutenFreeBreadPrice"
                square size="sm" outline color="primary" icon="local_pizza" class="q-mr-sm q-mb-sm"
              >
                Pane s/glutine €{{ ent.glutenFreeBreadPrice }}
              </q-chip>
            </div>
          </q-item-section>

          <!-- Freccia discreta (tutta la riga è cliccabile) -->
          <q-item-section side>
            <div class="arrow-wrap">
              <q-icon name="chevron_right" size="28px" class="text-primary" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'
import { sanity } from 'boot/sanity'

const router = useRouter()
const loading = ref(true)
const entities = ref([])

const GROQ = `*[
  _type=="entity" && (!defined(active) || active==true)
] | order(order asc){
  _id, name, address, city,
  "slug": coalesce(slug.current, name),
  "logoUrl": logo.asset->url,
  serviceCharge, glutenFreeBreadPrice
}`

onMounted(async () => {
  try {
    const rows = await sanity.fetch(GROQ)
    entities.value = rows || []
    console.debug('[Index] entities:', rows)
  } catch (e) {
    console.error(e)
    Notify.create({ type: 'negative', message: 'Errore nel caricamento dei locali', caption: e.message })
  } finally {
    loading.value = false
  }
})

const goTo = (ent) => {
  const base = ent.slug || ent.name || ''
  // prefisso prima del “–” o “-”
  const short = base.split('–')[0].split('-')[0].trim()
  const id = encodeURIComponent(short)
  router.push(`/${id}`)
}
</script>

<style scoped>
/* palette */
.bg-stone { background: #EAE3D8; }
:global(.text-primary) { color: #7B8449 !important; }

/* contenitore */
.container { max-width: 980px; margin: 0 auto; }

/* lista piatta, look “professionale” */
.flat-list { border-radius: 10px; overflow: hidden; }
.entity-row {
  transition: background-color .15s ease, transform .06s ease;
}
.entity-row:active { transform: scale(.997); }
.entity-row:hover { background: rgba(123,132,73,.06); }

/* logo naturale, niente crop */
.logo-box {
  width: 72px; height: 48px;
  display: flex; align-items: center; justify-content: center;
  background: #f6f3ee; border-radius: 6px; overflow: hidden;
}
.logo-natural { max-width: 100%; max-height: 100%; object-fit: contain; }
.logo-fallback { width: 100%; height: 100%; display: grid; place-items: center; font-weight: 700; }

/* chips che non “spingono” troppo */
.chip-row { overflow-x: auto; scrollbar-width: none; }
.chip-row::-webkit-scrollbar { display: none; }

/* freccia discreta a destra */
.arrow-wrap {
  width: 32px; height: 32px;
  display: grid; place-items: center;
  border: 1px solid rgba(123,132,73,.35);
  border-radius: 50%;
}
@media (hover: none) {
  .arrow-wrap { border-color: rgba(123,132,73,.25); }
}
</style>
