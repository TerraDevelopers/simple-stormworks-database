# Stormworks <> PostgreSQL

## What you need
- A [PostgreSQL server](https://www.postgresql.org/download/), with a user and database created and ready to use
- The latest version of [NodeJS](https://nodejs.org/)
- The ability to read

> I won't be going over how to install/setup postgres and nodejs, there's enough documentation of that all over the internet - Chris Chrome

## Getting started
1. Clone this repo with `git clone https://github.com/ChrisChrome/simple-stormworks-database.git`
2. Copy `config.json.default` to `config.json`
3. **SET AN AUTH TOKEN.** This is used to make sure people can't just run SQL queries on your server, yes it's a thing, don't ask how.
4. Set any other needed config options, including the information for your postgres server.
5. Run the `npm i` command to install dependencies.
6. Given you followed all these instructions, and your SQL server isn't misconfigured, start the web server with `node .`, you should see something along the lines of `Server running on port 3006`.
7. Test it! Open a web browser on the same machine the server is running on, and go to `http://127.0.0.1:yourport/db/?auth=yourauthtoken&query=SELECT;` (make sure to change the feilds to match your config). You should see something like this as the response
```
{
  "ident": null,
  "rows": [
    {}
  ],
  "rowCount": 1
}
```
At this point, some people are probably gonna be looking for a tool to see/modify the database data, check out [DBeaver](https://dbeaver.io/)
DBeaver will make it easier to set up your tables for use with this system
> If enough people ask for it, I might make a video on how to use Dbeaver a little bit - Chris Chrome

The `?query` parameter just takes and runs standard SQL queries! Here's some examples!
```

```

#DO NOT DIRECTLY PIPE UNFILTERED USER DATA (such as chat messages) INTO THE QUERY!!!
You have been warned

At this point you can begin using it with your stormworks addons!
I've left a handy little `?tag=whatever` parameter, that will get returned as-is in the http response, given how Stormworks does http responses. It's fully optional, but it's there.
If all is well, you can daemonize the node process using something like [nssm](https://nssm.cc) if you're on Windows, or whatever init system you use if you're running linux.