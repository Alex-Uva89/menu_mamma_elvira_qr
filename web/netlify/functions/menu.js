// CommonJS per compatibilità Netlify Functions
const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2024-08-01',
  token: process.env.SANITY_TOKEN,
  useCdn: true
})

/* Nota: nel seed non abbiamo impostato lo slug dell'entity.
   Usiamo "id" che può essere il NAME dell'entity (es. "La Cucina – Lecce").
*/
const query = `
{
  "entity": *[_type=="entity" && (name==$id || slug.current==$id)][0]{
    _id, name, address, city, serviceCharge, glutenFreeBreadPrice, openingHours
  },
  "categories": *[_type=="entityCategory" && entity->name==$id && visible==true]
    | order(order asc){
      _id, order, category->{_id, titleIntl}
  },
  "items": *[_type=="entityMenuItem" && entity->name==$id && available==true]{
    _id, sortOrder,
    categories[]-> {_id},
    item->{
      _id, titleIntl, descriptionIntl, labels, prices,
      allergens[]->{code, titleIntl, emoji},
      badges
    },
    priceOverrides, labelsOverride, badgesOverride, descriptionIntlOverride
  }
}
`

exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {}
    const id = params.id || 'La Cucina – Lecce' // default
    const data = await client.fetch(query, {id})

    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400'
    }
    return { statusCode: 200, headers, body: JSON.stringify(data) }
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({error: e.message}) }
  }
}
