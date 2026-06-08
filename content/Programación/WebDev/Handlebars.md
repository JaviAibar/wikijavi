# Bucles

```html
<ul class="people_list"> 
	{{#each people}} 
	<li>{{this}}</li> 
	{{/each}} 
</ul>
```

Ejemplo
```json
const ingredients = [
  { id: 1, date: '29-11-2024', name: 'sucuk', image: null },
  { id: 3, date: '', name: 'salami', image: null }
]
```


```handlebars
{{#each ingredients}}  
    {{#with this}}  
        <p>{{name}}</p>  
        <p>{{date}}</p>  
        <p>{{id}}</p>
        <img src="{{image}}" alt="{{name}}"/>
    {{/with}}  
{{/each}}
```

# Bibliografía

https://handlebarsjs.com/

https://handlebarsjs.com/guide/builtin-helpers.html#each

#WIP 


