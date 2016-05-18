# Differential update

The Differential update format provides a way to update specific fields of JOE
objects (Job, Chain, Order).

## Routing

It is avaiable in the following url: /api/{object}/update/{id}
(More details in api.md)
Where {object} is a JOE object name and {id} the object id.


## Update data

JSON data should be uploaded using the POST method containing only the
modified data as in the following example:

```json
{
     "name": "Job's new name",
     "script": {
         "language": "java"
     }
}
```
It will change the job name and script language.

We can note that field names directly maps entity attributes. When an
entity is used as attribute of another one (which is the case for
script), the JSON value must itself be an object.

### Updating Simple Arrays

Arrays can be updated in the differential update depending on their type,
simple arrays must be reset.

```json
{
	"day": [1, 2, 5, 6],
}
```

or

```json
{
	"ignoredSignals": ["SIGKILL", "SIGTERM"]
}
```

### Updating Arrays of entities
Array of entities, or Array collection must manipulated by atomic add
and remove operations.

#### Adding element

Append a diff
```json
{
	"weekdays:+": { day...}
}
```

or

Append an existing object
```json
{
	"weekdays:+": "uuid"
}
```


#### Removing element

```json
{
	"weekdays:-": "uuid"
}
```

## Rationale

Differential update (DU) provides an efficient way to update an
object. Indeed when one wants to modify such an object, he might not
change all the fields in it. Using DU we don't need to resend all the data.

It is also implemented to be as generic as possible to avoid code
redundancy.

## Field validation

Data validation is made using
[Symfony's entity validator](http://symfony.com/doc/current/book/validation.html).
