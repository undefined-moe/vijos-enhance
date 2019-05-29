class MongoDB {
    constructor() { }
    async connect(conn) {
        this.MongoClient = require('mongodb').MongoClient;
        this.host = conn.host || '127.0.0.1';
        this.port = conn.port || 27017;
        this.name = conn.name || 'hydro';
        if (conn.uname)
            this.url = `mongodb://${conn.uname}:${conn.passwd}@${this.host}:${this.port}/?authMechanism=SCRAM-SHA-1&authSource=${conn.auth_source || conn.name}`;
        else
            this.url = `mongodb://${this.host}:${this.port}/${this.name}`;
        this.database = await this.MongoClient.connect(this.url, { useNewUrlParser: true })
        return this.database.db(this.name);
    }
}

module.exports = MongoDB