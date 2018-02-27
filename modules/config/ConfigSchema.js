import { schema, arrayOf } from 'normalizr'


export const category = new schema.Entity('categories', {}, {idAttribute: '_id'})
export const config = new schema.Entity('config', {
	'categories': [ category ]
}, {idAttribute: () => 'currentConfig'})