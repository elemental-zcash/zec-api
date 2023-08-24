from zecwallet.wallet import Wallet

zec_wallet = Wallet('/usr/local/bin/zecwallet-cli')

def encrypt_message(address, message):
    output = zec_wallet.encryptMessage(address, message)
    return output["encrypted_base64"]

def decrypt_message(encryptedMessage):
    return zec_wallet.decryptMessage(encryptedMessage)


# output["to"] === address && output["memo"]


