# Architecture

JOE is a complex application that need advanced software mechanisms to work.

## Overview

JOE is composed of three distinct parts:
* The JOE app manager
* The interfaces (Static JS files)
* The API

![Architecture overview](overview.pdf)


## Lazy Loading

Interfaces are loaded on-demain by the app manager. The lazy loading
of interfaces allow the application to be faster and have the smallest
impact possible on the bandwith. Dynamic loading is done using the loader.js.

## API

The API provides an interface agnostic way to fetch and update the
data. More details in api.md
