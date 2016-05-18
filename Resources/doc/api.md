# JOE API

The JOE bundle comes with an application programming interface (API)
that allows one to easily create, update and delete database object.
Being tightly coupled with the differential update
(differential\_update.md) system, it is very efficient and generic.
The query selector (query\_selector.md) format is also used to select
specific data within objects.

/!\ : All routes depends on the actual routing configuration, the ones
given here only stands as example.

## targets

Each api action has a target, a target is an entity in lower camelcase.

For example if we wan't to create a chain, the chain entity name is
'JobChain' so it's target is jobChain

## create

Url: /api/{target}/create

Method: POST

A JSON with the differential update format must be posted to set
intial value. If no value should be changed, and empty object "{}"
should be posted.

Return value:

- HTTP Status: 200
The JSON serialization of the created object is returned in the
response data.  As most created object are not initially complex, the
full serialization of the object has small overhead considering the
usefulness of having the created data.

- HTTP Status: 400
An error occured, more details in the response data.

## Update

Url: /api/{target}/update/{id}

Method: POST

A JSON with the differential update format must be posted to update the data.

Return value:

- HTTP Status: 200
The update succeded.

- HTTP Status: 400
An error occured, more details in the response data.

## Remove

Url: /api/{target}/remove/{id}
Method: *

Return value:

- HTTP Status: 200
The remove succeded.

- HTTP Status: 400
An error occured, more details in the response data.

## JSON

Url: /api/{target}/json/{id}
Method: POST

A JSON value with the query selector format

Return value:

- HTTP Status: 200
A JSON object with the selected data


- HTTP Status: 400
An error occured, more details in the response data.

## XML

Url: /api/{target}/xml/{id}
Method: *

Return value:

- HTTP Status: 200
The remove succeded.

- HTTP Status: 400
An error occured, more details in the response data.

## List

Url: /api/{target}/list
Method: POST

A JSON value with the query selector format

Return value:

- HTTP Status: 200
Return a JSON array of all target, containing selected data

- HTTP Status: 400
An error occured, more details in the response data.
