Keyring = require './agent/keyring.coffee'

class Agent

  constructor: (session, identityKey) ->
    @session = session
    @keyring = new Keyring
    @keyring.identityKey = identityKey
    @keyring.preKey = preKey

  keyring: @keyring

  isAlice: (agent) ->
    return false if @session.isInitiatedWithPrekey

  isBob: (agent) ->
    !@isAlice(agent)

module.exports = Agent