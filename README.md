# Memory Leak Example

This example shows memory leak in node during usage of Microsoft SQL (msnodesqlv8 <= 2.0.5 - fixed in msnodesqlv8 2.0.6)

## Setup:

- node (tested on 14.9.0)
- [ODBC Driver 17 for SQL Server](https://www.microsoft.com/en-us/download/details.aspx?id=56567)
- credentials (or just use already available - setup in config.js)
  - requires working Microsoft SQL Server (express)
  - create login 'demo/demo123'
  - create database `mem_leak`
- `node create.js` for creating table with blobs
- `node select.js` for reading n times

## Issue:

- memory is not cleared/realesed/flushed after query, even after closed connection

## Question:

- how to release memory after each query?
