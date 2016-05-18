# Query selector

The Query selector format provides a way to query the data of specific
fields in objects.

## Format

A query selector must be a valid JSON object, where field names are
mapped to a value.

- If the value is true, the whole field is output (if it is an object,
it is fully serialized).
- If the value is an object, the query selection is made on the field
with the given object.
- Otherwise nothing is returned.


## Rationale

Query selection (QS) optimize the thoughtput of the application by
sending only needed data. Combined with lazy DOM construction it
allows one to construct very light and fast use interfaces.

## Example

The following query selector on a specific job
```json
{
     "name": true,
     "script": {
         "language": true
     }
}
```

May output
{ "name": "Foo", "script": { "language": "bar" } }

```json
true
```

Will return the full job serialization.
