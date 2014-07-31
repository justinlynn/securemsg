Mixable = require('mixation').mixable

serializer = require('./serializable/serializer.coffee')
deserializer = require('./serializable/deserializer.coffee')

class Serializable extends Mixable

  @classMethods:
    deserialize: (onDiskFormat) ->

  @instanceMethods:
    serialize: ->

##
module.exports = Serializable