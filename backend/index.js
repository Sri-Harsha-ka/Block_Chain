const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto-js");

const app = express();
app.use(bodyParser.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));


class Block {
    constructor(index, transactions, previousHash) {
        this.index = index;
        this.timestamp = Date.now();
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.SHA256(
            this.index + this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce
        ).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(transactions) {
        const prevBlock = this.getLatestBlock();
        const newBlock = new Block(this.chain.length, transactions, prevBlock.hash);
        this.chain.push(newBlock);
        return newBlock;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== prevBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

const blockchain = new Blockchain();


app.get("/get_chain", (req, res) => {
    res.json({ chain: blockchain.chain });
});

app.post("/add_block", (req, res) => {
    const { transactions } = req.body; 
    
    if (!transactions) {
        return res.status(400).json({ error: "Transactions data is required" });
    }

    const newBlock = blockchain.addBlock(transactions);
    res.json({ message: "Block added successfully!", block: newBlock });
});


app.get("/is_valid", (req, res) => {
    res.json({ valid: blockchain.isChainValid() });
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Blockchain backend running on http://localhost:${PORT}`);
});
