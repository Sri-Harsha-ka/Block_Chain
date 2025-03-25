import hashlib
import time

class Block:
    def __init__(self, index, transactions, previous_hash):
        self.index = index
        self.timestamp = time.time()
        self.transactions = transactions
        self.previous_hash = previous_hash
        self.nonce = 0  # Used for proof-of-work
        self.hash = self.calculate_hash()
    
    def calculate_hash(self):
        """Generate SHA-256 hash based on block data"""
        block_data = f"{self.index}{self.timestamp}{self.transactions}{self.previous_hash}{self.nonce}"
        return hashlib.sha256(block_data.encode()).hexdigest()

class Blockchain:
    def __init__(self):
        self.chain = [self.create_genesis_block()]

    def create_genesis_block(self):
        """First block of the blockchain with dummy data"""
        return Block(0, "Genesis Block", "0")

    def get_latest_block(self):
        """Retrieve the most recent block in the chain"""
        return self.chain[-1]

    def add_block(self, transactions):
        """Adds a new block to the blockchain"""
        previous_block = self.get_latest_block() 
        new_block = Block(len(self.chain), transactions, previous_block.hash)
        self.chain.append(new_block)

    def is_chain_valid(self):
        """Check the integrity of the blockchain"""
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i - 1]

            if current_block.hash != current_block.calculate_hash():
                return False 

            if current_block.previous_hash != previous_block.hash:
                return False

        return True

my_blockchain = Blockchain()
my_blockchain.add_block("Alice pays Bob 10 BTC")
my_blockchain.add_block("Bob pays Charlie 5 BTC")

for block in my_blockchain.chain:
    print(f"Block {block.index} | Hash: {block.hash[:10]}... | Prev: {block.previous_hash[:10]}...")

print("Blockchain valid?", my_blockchain.is_chain_valid())
