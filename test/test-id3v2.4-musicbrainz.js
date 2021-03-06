/* jshint maxlen: 140 */

var path = require('path')
var fs = require('fs')
var mm = require('..')
var test = require('tape')

test('MusicBrainz tags with id3v2.4', function (t) {
  t.plan(49)
  var tconCounter = 0

  var sample = (process.browser) ?
    new window.Blob([fs.readFileSync(__dirname + '/samples/id3v2.4-musicbrainz.mp3')])
    : fs.createReadStream(path.join(__dirname, '/samples/id3v2.4-musicbrainz.mp3'))

  mm.parseStream(sample, {duration: true, native: true}, function (err, result) {
    t.error(err)

    t.deepEqual(result.format.duration, 1, 'format.duration')

    t.deepEqual(result.common.title, 'Home', 'common.title')
    t.deepEqual(result.common.artist, 'Explosions in the Sky', 'common.artist')
    t.deepEqual(result.common.albumartist, 'Explosions in the Sky', 'common.albumartist')
    t.deepEqual(result.common.album, 'Friday Night Lights: Original Motion Picture Soundtrack', 'common.album')
    t.deepEqual(result.common.year, 2004, 'common.year')
    t.deepEqual(result.common.date, '2004-10-12', 'common.date')
    t.deepEqual(result.common.track, {no: 5, of: 14}, 'common.track')
    t.deepEqual(result.common.disk, {no: 1, of: 1}, 'common.disk')
    t.deepEqual(result.common.genre, ['Soundtrack', 'OST'], 'common.genre')
    t.deepEqual(result.common.picture[0].format, 'jpg', 'common.picture 0 format')
    t.deepEqual(result.common.picture[0].data.length, 75818, 'common.picture 0 length')

    t.deepEqual(result.common.isrc, 'USUG10400421', 'common.isrc')
    t.deepEqual(result.common.catalognumber, 'B0003663-02', 'common.catalognumber')
    t.deepEqual(result.common.label, 'Hip-O Records', 'common.label')
    t.deepEqual(result.common.releasecountry, 'US', 'common.releasecountry')
    t.deepEqual(result.common.media, 'CD', 'common.media')
    t.deepEqual(result.common.musicbrainz_artistid, ['4236acde-2ce2-441c-a3d4-38d55f1b5474'], 'MusicBrainz Artist Id')
    t.deepEqual(result.common.musicbrainz_recordingid, '84851150-a196-48fa-ada5-1a012b1cd9ed', 'MusicBrainz Recording Id')
    t.deepEqual(result.common.musicbrainz_albumartistid, ['4236acde-2ce2-441c-a3d4-38d55f1b5474'], 'MusicBrainz Release Artist Id')
    t.deepEqual(result.common.musicbrainz_releasegroupid, 'afe7c5d8-f8bc-32cf-b77d-8fb8561989a7', 'MusicBrainz Release Group Id')
    t.deepEqual(result.common.musicbrainz_albumid, '2644f258-0619-4beb-a150-0c0069ca6699', 'MusicBrainz Release Id')
    t.deepEqual(result.common.musicbrainz_trackid, 'd87d56d0-9bd3-3199-8ff3-d03dff3abb13', 'MusicBrainz Track Id')
    t.end()
  })
    .on('duration', function (result) {
      t.deepEqual(result, 1, 'duration')
    })
    // aliased tests
    .on('title', function (result) {
      t.deepEqual(result, 'Home', 'aliased title')
    })
    .on('artist', function (result) {
      t.deepEqual(result, 'Explosions in the Sky')
    })
    .on('albumartist', function (result) {
      t.deepEqual(result, 'Explosions in the Sky', 'aliased albumartist')
    })
    .on('album', function (result) {
      t.deepEqual(result, 'Friday Night Lights: Original Motion Picture Soundtrack', 'aliased album')
    })
    .on('year', function (result) {
      t.deepEqual(result, 2004, 'aliased year')
    })
    .on('track', function (result) {
      t.deepEqual(result, {no: 5, of: 14}, 'aliased track no/of')
    })
    .on('disk', function (result) {
      t.deepEqual(result, {no: 1, of: 1}, 'aliased disk no/of')
    })
    .on('genre', function (result) {
      t.deepEqual(result, ['Soundtrack', 'OST'], 'aliased genre')
    })
    .on('picture', function (result) {
      t.strictEqual(result[0].format, 'jpg', 'aliased picture 0 format')
      t.strictEqual(result[0].data.length, 75818, 'aliased picture 0 length')
    })
    // raw tests
    .on('TALB', function (result) {
      t.deepEqual(result, 'Friday Night Lights: Original Motion Picture Soundtrack', 'raw TALB')
    })
    .on('TPE1', function (result) {
      t.deepEqual(result, 'Explosions in the Sky', 'raw TPE1 0')
    })
    .on('TPE2', function (result) {
      t.deepEqual(result, 'Explosions in the Sky', 'raw TPE2')
    })
    .on('TCOM', function (result) {
      t.deepEqual(result, 'Explosions in the Sky', 'raw TCOM')
    })
    .on('TPOS', function (result) {
      t.deepEqual(result, '1/1', 'raw TPOS')
    })
    .on('TCON', function (result) {
      if (tconCounter === 0) {
        t.deepEqual(result, 'Soundtrack', 'raw TCON 0')
      }
      if (tconCounter === 1) {
        t.deepEqual(result, 'OST', 'raw TCON 1')
      }
      tconCounter++
    })
    .on('TIT2', function (result) {
      t.deepEqual(result, 'Home', 'raw TIT2')
    })
    .on('TRCK', function (result) {
      t.deepEqual(result, '5/14', 'raw TRCK')
    })
    .on('TDRC', function (result) {
      t.deepEqual(result, '2004-10-12', 'raw TDRC')
    })
    .on('APIC', function (result) {
      t.deepEqual(result.format, 'image/jpeg', 'raw APIC 0 format')
      t.deepEqual(result.type, 'Cover (front)', 'raw APIC 0 headerType')
      t.deepEqual(result.description, '', 'raw APIC 0 description')
      t.deepEqual(result.data.length, 75818, 'raw APIC 0 length')
    })
    .on('TSSE', function (result) {
      t.deepEqual(result, 'image/jpeg', 'raw APIC 0 format')
    })
})
