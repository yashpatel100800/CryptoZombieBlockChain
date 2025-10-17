# Team Zombies

1. Diya Shah - 813542917 - diyaashah@csu.fullerton.edu
2. Yash Patel - 824754618 - yashpatel100800@csu.fullerton.edu

# Repo Link
https://github.com/yashpatel100800/CryptoZombieProject

# Video Demo
https://youtu.be/x-XFsixdI4I?si=suGJTItJRJ3JsP2e

# Improvments
1. Build a nice website for the DApp.
2. Add a zombie image extracting according to the DNA from Custom Logic.
3. User can create multiple zombies.
4. Updated the starter code and made it dynamic so data comes directly from the build file.
5. Apart from starter pack below are the additional functionalities :
   1. Create Multiple Zombie
   2. Level Up Multiple Zombie
   3. Transfer Zombie from account to another account
   4. Change Name
   5. Change Dna
   6. Delete Multiple Zombie
   7. List the zombie on NFT Market:
       - If user clicks buy, Whatever ether posted is debited from buyer
       - Ownership transfer from seller to buyer
   8. cancel the zombie on NFT market

# To run this application
1. Install the dependencies using npm install.
   - If specific version needed use nvm and start using that version with nvm use.
2. Install Ganache and update the truffle-config.js file with the its network configuration.
3. Compile all the contracts using truffle compile.
4. Migrate all the contracts using truffle migrate.
5. Install Metamask and connect to the Ganache network using the following details:
   - Network Name: MyGanache
   - New RPC URL: http://localhost:7545
   - Chain ID: 1337 (if your network id is different, change it to 1337)
   - Symbol: ETH
6. Copy the private key of any account from Ganache and add a new account in Metamask using the private key.
7. In index.html use secrets.networks[5777].address
8. install http server with npm i http-server
9. Run npx http-server

# Additional Instructions
1. Use truffle migrate --reset to redeploy on Ganache.
