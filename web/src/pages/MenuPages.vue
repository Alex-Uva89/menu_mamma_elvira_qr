<template>
  <q-layout view="hHh lpR fFf">
   <!-- HEADER -->
<q-header elevated class="bg-primary text-white">
  <q-toolbar class="justify-between">

    <!-- Bottone lingua: apre dialog -->
    <q-btn
      flat round dense
      aria-label="Lingua"
      @click="showLangDialog = true"
    >
      <img :src="currentLang.flag" :alt="currentLang.label" width="22" height="16" style="border-radius:2px" />
    </q-btn>

    <!-- Logo al centro (proporzioni originali) -->
    <q-toolbar-title class="q-ma-none flex justify-center">
      <div v-if="entity?.logoUrl">
        <img :src="entity.logoUrl" alt="logo" class="logo-img" />
      </div>
      <q-avatar v-else size="44px" square color="white" text-color="primary">
        {{ initials(entity?.name) }}
      </q-avatar>
    </q-toolbar-title>

    <!-- Allergeni a destra -->
    <q-btn flat round dense icon="medical_information" :aria-label="$t('menu.allergens')" @click="showAllergens = true" />
  </q-toolbar>
</q-header>

<!-- DIALOG LINGUA -->
<q-dialog v-model="showLangDialog" persistent transition-show="scale" transition-hide="scale">
  <q-card class="lang-card">
    <q-card-section class="row items-center">
      <div class="text-h6">{{ $t('menu.lang') }}</div>
      <q-space />
      <q-btn dense flat round icon="close" v-close-popup />
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="row q-col-gutter-md justify-center">
        <div
          v-for="l in langs" :key="l.value"
          class="col-4 col-sm-3 col-md-2"
        >
          <q-card
            flat
            bordered
            class="lang-tile cursor-pointer"
            :class="{'lang-active': l.value === lang}"
            @click="pickLang(l.value)"
          >
            <div class="lang-flag-wrap">
              <img :src="l.flag" :alt="l.label" class="lang-flag" />
            </div>
            <div class="text-caption text-center q-pt-xs">
              {{ l.label }}
            </div>
          </q-card>
        </div>
      </div>
    </q-card-section>
  </q-card>
</q-dialog>

    <q-page-container>
      <q-page padding>
        <q-inner-loading :showing="loading">
          <q-spinner size="40px" color="white" />
        </q-inner-loading>

        <div v-if="!loading && selectedCat">
          <div class="text-h4 text-primary text-weight-bold q-mb-sm text-uppercase">
            {{ selectedCat.category.titleIntl?.[lang] || selectedCat.category.titleIntl?.it }}
          </div>

          <!-- Banner filtro allergeni attivo -->
          <q-banner
            v-if="selectedAllergenCodes.size > 0"
            class="q-mb-md bg-white"
            rounded
            inline-actions
          >
            <template #avatar>
              <q-icon name="filter_alt" color="primary" />
            </template>
            <div class="text-body2">
              {{ $t('menu.filterShowingWithout') }}:
              <q-chip
                v-for="code in Array.from(selectedAllergenCodes)"
                :key="code"
                dense
                color="primary"
                text-color="white"
                class="q-mr-xs q-mb-xs"
              >
                {{ code }}
              </q-chip>
              <span class="text-grey-7 q-ml-sm">({{ itemsOfSelected.length }})</span>
            </div>
            <template #action>
              <q-btn flat dense no-caps color="primary" icon="clear" :label="$t('menu.clear')" @click="clearAllergenFilter" />
            </template>
          </q-banner>

          <div class="row q-col-gutter-md">
            <div v-for="row in itemsOfSelected" :key="row._id" class="col-12 col-sm-6">
              <q-card class="my-card">
                <q-card-section class="q-pb-sm">
                  <div class="row items-start no-wrap">
                    <div class="col">
                      <div class="text-h6 text-weight-bold text-primary q-pr-sm">{{ titleOf(row) }}</div>
                      <div class="text-body2 text-grey-8 q-mt-xs">{{ descriptionOf(row) }}</div>
                    </div>
                    <div class="col-auto price text-h6 text-weight-bold text-primary">{{ priceOf(row) }}</div>
                  </div>
                  <div class="q-mt-sm flex items-center text-caption text-grey-7">
                    <span v-for="al in row.item.allergens || []" :key="al.code" class="q-mr-md">
                      {{ al.emoji }} {{ al.titleIntl?.[lang] || al.titleIntl?.it }}
                    </span>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- Nessun risultato dopo filtro -->
            <div v-if="itemsOfSelected.length === 0" class="col-12">
              <q-banner rounded class="bg-white text-dark">
                {{ $t('menu.noResults') }}
              </q-banner>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-white shadow-lg">
      <q-tabs
        v-model="activeTab"
        align="justify"
        active-color="white"
        indicator-color="white"
        class="bg-primary text-white text-bold big-tabs"
        @update:model-value="onTabChange"
      >
        <q-tab
          v-for="c in categories"
          :key="c._id"
          v-show="c.category"
          :name="c.category._id"
          :label="c.category.titleIntl?.[lang] || c.category.titleIntl?.it"
          class="q-mx-sm tab-pill"
        />
      </q-tabs>
    </q-footer>

    <!-- DIALOG ALLERGENI con selezione filtro -->
    <q-dialog v-model="showAllergens">
      <q-card style="min-width:340px;max-width:560px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('menu.allergenDialogTitle') }}</div>
          <q-space />
          <q-btn dense flat round icon="close" v-close-popup />
        </q-card-section>
        <q-separator />

        <q-card-section>
          <div class="text-caption text-grey-7 q-mb-sm">
            {{ $t('menu.allergenDialogSubtitle') }}
          </div>

          <q-list bordered class="bg-white">
            <q-item
              v-for="a in allAllergensSorted"
              :key="a.code"
              clickable
              @click="toggleAllergen(a.code)"
              :aria-label="`Escludi ${a.titleIntl?.[lang] || a.titleIntl?.it}`"
            >
              <q-item-section avatar>
                <div class="text-h6">{{ a.emoji }}</div>
              </q-item-section>

              <q-item-section>
                <div>{{ a.titleIntl?.[lang] || a.titleIntl?.it }}</div>
                <div class="text-caption text-grey">{{ a.code }}</div>
              </q-item-section>

              <q-item-section side>
                <q-toggle
                  :model-value="selectedAllergenCodes.has(a.code)"
                  @update:model-value="val => setAllergen(a.code, val)"
                  color="primary"
                />
              </q-item-section>
            </q-item>
          </q-list>

          <div class="row q-mt-md q-gutter-sm">
            <q-btn
              color="primary"
              unelevated
              class="col"
              icon="done_all"
              :label="$t('menu.apply')"
              v-close-popup
            />
            <q-btn
              flat
              color="primary"
              class="col"
              icon="clear"
              :label="$t('menu.clearAll')"
              @click="clearAllergenFilter"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { sanity } from 'boot/sanity'

const { locale } = useI18n()

// lingua iniziale IT
const saved = localStorage.getItem('locale')
const lang = ref(saved || 'it')
locale.value = lang.value

const setLang = (v) => {
  lang.value = v
  locale.value = v
  localStorage.setItem('locale', v)
}

const showLangDialog = ref(false)

const pickLang = (value) => {
  setLang(value)
  showLangDialog.value = false
}

const langs = [
  { label: 'Italiano', value: 'it', flag: 'https://flagcdn.com/w20/it.png' },
  { label: 'English',  value: 'en', flag: 'https://flagcdn.com/w20/gb.png' },
  { label: 'Français', value: 'fr', flag: 'https://flagcdn.com/w20/fr.png' },
  { label: 'Deutsch',  value: 'de', flag: 'https://flagcdn.com/w20/de.png' },
  { label: 'Español',  value: 'es', flag: 'https://flagcdn.com/w20/es.png' },
  { label: 'Русский',  value: 'ru', flag: 'https://flagcdn.com/w20/ru.png' }
]
const currentLang = computed(() => langs.find(l => l.value === lang.value) || langs[0])

const route = useRoute()
const loading = ref(true)
const entity = ref(null)
const categories = ref([])
const items = ref([])
const activeTab = ref(null)
const showAllergens = ref(false)
const allAllergens = ref([])

/* === GROQ === */
const GROQ = `{
  "entity": *[
    _type=="entity" && (name==$id || slug.current==$id || name match $id + '*')
  ][0]{ _id, name, address, city, "logoUrl": logo.asset->url },

  "categories": *[
    _type=="entityCategory"
    && (entity->name==$id || entity->slug.current==$id || entity->name match $id + '*')
    && visible==true
  ] | order(order asc){
    _id, order, category->{_id, titleIntl}
  }[defined(category)],

  "items": *[
    _type=="entityMenuItem"
    && (entity->name==$id || entity->slug.current==$id || entity->name match $id + '*')
    && available==true
  ]{
    _id, sortOrder,
    "categories": (categories[]->{_id})[defined(_id)],
    item->{ _id, titleIntl, descriptionIntl, labels, prices, allergens[]->{code, titleIntl, emoji} },
    priceOverrides, descriptionIntlOverride
  }
}`

onMounted(async () => {
  try {
    const id = route.params.entityId || 'La Cucina'
    const data = await sanity.fetch(GROQ, { id })
    entity.value = data.entity
    categories.value = data.categories || []
    items.value = data.items || []

    const m = new Map()
    items.value.forEach(row => (row.item.allergens || []).forEach(al => m.set(al.code, al)))
    allAllergens.value = Array.from(m.values())
    activeTab.value = categories.value[0]?.category?._id || null
  } finally {
    loading.value = false
  }
})

/* ===== filtro allergeni ===== */
const selectedAllergenCodes = ref(new Set())

const allAllergensSorted = computed(() =>
  [...allAllergens.value].sort((a, b) => a.code.localeCompare(b.code))
)

const toggleAllergen = (code) => {
  const s = new Set(selectedAllergenCodes.value)
  s.has(code) ? s.delete(code) : s.add(code)
  selectedAllergenCodes.value = s
}
const setAllergen = (code, val) => {
  const s = new Set(selectedAllergenCodes.value)
  if (val) s.add(code); else s.delete(code)
  selectedAllergenCodes.value = s
}
const clearAllergenFilter = () => { selectedAllergenCodes.value = new Set() }

/* ===== categoria selezionata + items filtrati ===== */
const selectedCat = computed(() =>
  categories.value.find(c => c.category?._id === activeTab.value) || null
)
const itemsOfSelected = computed(() => {
  const blocked = selectedAllergenCodes.value
  return (items.value || [])
    .filter(i => (i.categories || []).some(c => c && c._id === activeTab.value))
    .filter(i => {
      if (!blocked || blocked.size === 0) return true
      const codes = (i.item.allergens || []).map(a => a.code)
      return !codes.some(code => blocked.has(code))
    })
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
})

/* ===== Helpers ===== */
const titleOf = (row) => row.item.titleIntl?.[lang.value] || row.item.titleIntl?.it
const descriptionOf = (row) =>
  row.descriptionIntlOverride?.[lang.value] ||
  row.item.descriptionIntl?.[lang.value] ||
  row.item.descriptionIntl?.it || ''
const priceOf = (row) => (row.priceOverrides?.[0]?.amount) ?? (row.item.prices?.[0]?.amount) ?? '--'
const initials = (str) => (str || '').split(' ').filter(Boolean).slice(0, 2).map(s => s[0]?.toUpperCase()).join('')
const onTabChange = () => {}
</script>

<style scoped>
.q-page { background: #F9F6F1; }
.logo-img { max-height: 60px; height: auto; width: auto; object-fit: contain; }

.my-card { border-radius: 16px; padding: 8px; box-shadow: 0 6px 16px rgba(0,0,0,0.1); transition: transform .25s ease; }
.my-card:hover { transform: translateY(-5px); }

.price { white-space: nowrap; min-width: 80px; text-align: right; }

.big-tabs { height: 82px; font-size: 16px; }
.tab-pill { border-radius: 22px; padding: 10px 16px; }

.text-primary { color: #7B8449 !important; }
.bg-primary { background: #7B8449 !important; }

.lang-card {
  min-width: 320px;
  max-width: 640px;
}

.lang-tile {
  border-radius: 10px;
  transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
  padding: 10px 8px;
}
.lang-tile:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
}
.lang-active {
  border: 2px solid #7B8449; /* primary */
}

.lang-flag-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
}
.lang-flag {
  height: 32px;
  width: auto;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0,0,0,.12);
}

</style>
