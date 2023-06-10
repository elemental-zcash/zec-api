from flask import request, jsonify
from api import bp as api

import wallet

@api.route('/encryptmessage/<address>')
# @require_oauth()
def encrypt_message(address):
    memo = request.args.get('memo', '')
    res = wallet.encrypt_message(address, memo)
    return jsonify({"result": res})

@api.route('/decryptmessage/<address>', methods=["POST"])
def decrypt_message(address):
    # message = request.args.get('message', '')
    data = request.get_json() or {}
    message = data.get("message", "")
    if (message is None or ""):
        return jsonify({"error": "message is empty"})

    print({"message":message})
    try:
        res = wallet.decrypt_message(message)
    except Exception as e:
        # Handling the exception and printing the error message
        print("An error occurred:", str(e))
    print(res)
    if (res is None or "to" not in res or "memo" not in res):
        return jsonify({"error": "An error occurred"})
    to = res["to"]
    memo = res["memo"]

    if (to != address):
        return jsonify({"error": "Incorrect address"})
    return jsonify({"memo": memo})
