export type HeaderType = 'vorbis' | 'id3v1.1'| 'id3v2.2' | 'id3v2.3' | 'id3v2.4' | 'APEv2' | 'asf'

export type CommonTag = 'track' | 'disk' | 'year' | 'title' | 'artist' | 'albumartist' | 'album' | 'date' | 'originaldate' |
  'originalyear' | 'comment' | 'genre' | 'picture' | 'composer' | 'lyrics' | 'albumsort' | 'titlesort' | 'work' |
  'artistsort' | 'albumartistsort' | 'composersort' | 'lyricist' | 'writer' | 'conductor' | 'remixer' |
  'arranger' | 'engineer' | 'producer' | 'djmixer' | 'mixer' | 'label' | 'grouping' | 'subtitle' |
  'discsubtitle' | 'totaltracks' | 'totaldiscs' | 'compilation' | '_rating' | 'bpm' |
  'mood' | 'media' | 'catalognumber' | 'show' | 'showsort' | 'podcast' | 'podcasturl' |
  'releasestatus' | 'releasetype' | 'releasecountry' | 'script' | 'language' |
  'copyright' | 'license' | 'encodedby' | 'encodersettings' | 'gapless' | 'barcode' |
  'isrc' | 'asin' | 'musicbrainz_recordingid' | 'musicbrainz_trackid' | 'musicbrainz_albumid' |
  'musicbrainz_artistid' | 'musicbrainz_albumartistid' | 'musicbrainz_releasegroupid' |
  'musicbrainz_workid' | 'musicbrainz_trmid' | 'musicbrainz_discid' | 'acoustid_id' |
  'acoustid_fingerprint' | 'musicip_puid' | 'musicip_fingerprint' | 'website' | 'performer:instrument'

export interface INativeTagMap {
  [index: string]: CommonTag
}

export interface ITagInfo {
  singleton: boolean
}

export interface ITagInfoMap {
  [index: string]: ITagInfo
}

interface INativeTagMappings {
  asf: INativeTagMap
  APEv2: INativeTagMap,
  'id3v1.1': INativeTagMap,
  'id3v2.2': INativeTagMap,
  'id3v2.3': INativeTagMap,
  'id3v2.4': INativeTagMap,
  m4a: INativeTagMap,
  vorbis: INativeTagMap
}

/**
 * tagmap maps native meta tags to generic common types
 */
export default class TagMap {

  public static getCommonTag(tag: CommonTag): ITagInfo {
    return TagMap.commonTags[tag]
  }

  public static isCommonTag(tag: string): boolean {
    return TagMap.commonTags[tag] !== undefined
  }

  /**
   * @param alias Name of common tag
   * @returns {boolean|*} true if given alias is mapped as a singleton', otherwise false
   */
  public static isSingleton(alias: CommonTag): boolean {
    return TagMap.commonTags.hasOwnProperty(alias) && TagMap.commonTags[alias].singleton
  }

  private static commonTags: ITagInfoMap =
  {
    year: {singleton: true},
    track: {singleton: true},
    disk: {singleton: true},

    title: {singleton: true},
    artist: {singleton: false},
    albumartist: {singleton: false},
    album: {singleton: true},
    date: {singleton: true},
    originaldate: {singleton: true},
    originalyear: {singleton: true},
    comment: {singleton: false},
    genre: {singleton: false},
    picture: {singleton: false},
    composer: {singleton: false},
    lyrics: {singleton: false},
    albumsort: {singleton: true},
    titlesort: {singleton: true},
    work: {singleton: true},
    artistsort: {singleton: false},
    albumartistsort: {singleton: false},
    composersort: {singleton: false},
    lyricist: {singleton: false},
    writer: {singleton: false},
    conductor: {singleton: false},
    remixer: {singleton: false},
    arranger: {singleton: false},
    engineer: {singleton: false},
    producer: {singleton: false},
    djmixer: {singleton: false},
    mixer: {singleton: false},
    label: {singleton: true},
    grouping: {singleton: true},
    subtitle: {singleton: true},
    discsubtitle: {singleton: true},
    totaltracks: {singleton: true},
    totaldiscs: {singleton: true},
    compilation: {singleton: true},
    _rating: {singleton: true},
    bpm: {singleton: true},
    mood: {singleton: true},
    media: {singleton: true},
    catalognumber: {singleton: true},
    show: {singleton: true},
    showsort: {singleton: true},
    podcast: {singleton: true},
    podcasturl: {singleton: true},
    releasestatus: {singleton: true},
    releasetype: {singleton: false},
    releasecountry: {singleton: true},
    script: {singleton: true},
    language: {singleton: true},
    copyright: {singleton: true},
    license: {singleton: true},
    encodedby: {singleton: true},
    encodersettings: {singleton: true},
    gapless: {singleton: true},
    barcode: {singleton: true},
    isrc: {singleton: true},
    asin: {singleton: true},
    musicbrainz_recordingid: {singleton: true},
    musicbrainz_trackid: {singleton: true},
    musicbrainz_albumid: {singleton: true},
    musicbrainz_artistid: {singleton: false},
    musicbrainz_albumartistid: {singleton: false},
    musicbrainz_releasegroupid: {singleton: true},
    musicbrainz_workid: {singleton: true},
    musicbrainz_trmid: {singleton: true},
    musicbrainz_discid: {singleton: true},
    acoustid_id: {singleton: true},
    acoustid_fingerprint: {singleton: true},
    musicip_puid: {singleton: true},
    musicip_fingerprint: {singleton: true},
    website: {singleton: true},
    'performer:instrument': {singleton: false}
  }

  /**
   * Mapping from native header format to one or possibly more 'common' entries
   * The common entries aim to read the same information from different media files
   * independent of the underlying format
   */
  private static vorbis: INativeTagMap = {
    TITLE: 'title',
    ARTIST: 'artist',
    ALBUMARTIST: 'albumartist',
    ALBUM: 'album',
    DATE: 'date',
    ORIGINALDATE: 'originaldate',
    ORIGINALYEAR: 'originalyear',
    COMMENT: 'comment',
    TRACKNUMBER: 'track',
    DISCNUMBER: 'disk',
    GENRE: 'genre',
    METADATA_BLOCK_PICTURE: 'picture',
    COMPOSER: 'composer',
    LYRICS: 'lyrics',
    ALBUMSORT: 'albumsort',
    TITLESORT: 'titlesort',
    WORK: 'work',
    ARTISTSORT: 'artistsort',
    ALBUMARTISTSORT: 'albumartistsort',
    COMPOSERSORT: 'composersort',
    LYRICIST: 'lyricist',
    WRITER: 'writer',
    CONDUCTOR: 'conductor',
    // 'PERFORMER=artist (instrument)': 'performer:instrument', // ToDo
    REMIXER: 'remixer',
    ARRANGER: 'arranger',
    ENGINEER: 'engineer',
    PRODUCER: 'producer',
    DJMIXER: 'djmixer',
    MIXER: 'mixer',
    LABEL: 'label',
    GROUPING: 'grouping',
    SUBTITLE: 'subtitle',
    DISCSUBTITLE: 'discsubtitle',
    TRACKTOTAL: 'totaltracks',
    DISCTOTAL: 'totaldiscs',
    COMPILATION: 'compilation',
    'RATING:user@email': '_rating',
    BPM: 'bpm',
    MOOD: 'mood',
    MEDIA: 'media',
    CATALOGNUMBER: 'catalognumber',
    RELEASESTATUS: 'releasestatus',
    RELEASETYPE: 'releasetype',
    RELEASECOUNTRY: 'releasecountry',
    SCRIPT: 'script',
    LANGUAGE: 'language',
    COPYRIGHT: 'copyright',
    LICENSE: 'license',
    ENCODEDBY: 'encodedby',
    ENCODERSETTINGS: 'encodersettings',
    BARCODE: 'barcode',
    ISRC: 'isrc',
    ASIN: 'asin',
    MUSICBRAINZ_TRACKID: 'musicbrainz_recordingid',
    MUSICBRAINZ_RELEASETRACKID: 'musicbrainz_trackid',
    MUSICBRAINZ_ALBUMID: 'musicbrainz_albumid',
    MUSICBRAINZ_ARTISTID: 'musicbrainz_artistid',
    MUSICBRAINZ_ALBUMARTISTID: 'musicbrainz_albumartistid',
    MUSICBRAINZ_RELEASEGROUPID: 'musicbrainz_releasegroupid',
    MUSICBRAINZ_WORKID: 'musicbrainz_workid',
    MUSICBRAINZ_TRMID: 'musicbrainz_trmid',
    MUSICBRAINZ_DISCID: 'musicbrainz_discid',
    ACOUSTID_ID: 'acoustid_id',
    ACOUSTID_FINGERPRINT: 'acoustid_fingerprint',
    MUSICIP_PUID: 'musicip_puid',
    // 'FINGERPRINT=MusicMagic Fingerprint {fingerprint}': 'musicip_fingerprint', // ToDo
    WEBSITE: 'website'
  }

  private static id3v1_1: INativeTagMap = {
    title: 'title',
    artist: 'artist',
    album: 'album',
    year: 'year',
    comment: 'comment',
    track: 'track',
    genre: 'genre'
  }

  private static id3v2_2: INativeTagMap = {
    TT2: 'title',
    TP1: 'artist',
    TP2: 'albumartist',
    TAL: 'album',
    TYE: 'year',
    COM: 'comment',
    TRK: 'track',
    TPA: 'disk',
    TCO: 'genre',
    PIC: 'picture',
    TCM: 'composer',

    TOR: 'originaldate',
    TOT: 'work',
    TXT: 'lyricist',
    TP3: 'conductor',
    TPB: 'label',
    TT1: 'grouping',
    TT3: 'subtitle',
    TLA: 'language',
    TCR: 'copyright',
    WCP: 'license',
    TEN: 'encodedby',
    TSS: 'encodersettings',
    WAR: 'website'
  }

  private static id3v2_3: INativeTagMap = {
    // id3v2.3
    TIT2: 'title',
    TPE1: 'artist',
    TPE2: 'albumartist',
    TALB: 'album',
    TDRV: 'date', // [ 'date', 'year' ] ToDo: improve 'year' mapping
    TORY: 'originaldate',
    'COMM:description': 'comment',
    TRCK: 'track',
    TPOS: 'disk',
    TCON: 'genre',
    APIC: 'picture',
    TCOM: 'composer',
    'USLT:description': 'lyrics',
    TSOA: 'albumsort',
    TSOT: 'titlesort',
    TOAL: 'work',
    TSOP: 'artistsort',
    TSO2: 'albumartistsort',
    TSOC: 'composersort',
    TEXT: 'lyricist',
    'TXXX:Writer': 'writer',
    TPE3: 'conductor',
    // 'IPLS:instrument': 'performer:instrument', // ToDo
    TPE4: 'remixer',
    'IPLS:arranger': 'arranger',
    'IPLS:engineer': 'engineer',
    'IPLS:producer': 'producer',
    'IPLS:DJ-mix': 'djmixer',
    'IPLS:mix': 'mixer',
    TPUB: 'label',
    TIT1: 'grouping',
    TIT3: 'subtitle',
    // 'TRCK: 'totaltracks',
    // 'TPOS: 'totaldiscs',
    TCMP: 'compilation',
    POPM: '_rating',
    TBPM: 'bpm',
    TMED: 'media',
    'TXXX:CATALOGNUMBER': 'catalognumber',
    'TXXX:MusicBrainz Album Status': 'releasestatus',
    'TXXX:MusicBrainz Album Type': 'releasetype',
    'TXXX:MusicBrainz Album Release Country': 'releasecountry',
    'TXXX:SCRIPT': 'script',
    TLAN: 'language',
    TCOP: 'copyright',
    WCOP: 'license',
    TENC: 'encodedby',
    TSSE: 'encodersettings',
    'TXXX:BARCODE': 'barcode',
    TSRC: 'isrc',
    'TXXX:ASIN': 'asin',
    'UFID:http://musicbrainz.org': 'musicbrainz_recordingid',
    'TXXX:MusicBrainz Release Track Id': 'musicbrainz_trackid',
    'TXXX:MusicBrainz Album Id': 'musicbrainz_albumid',
    'TXXX:MusicBrainz Artist Id': 'musicbrainz_artistid',
    'TXXX:MusicBrainz Album Artist Id': 'musicbrainz_albumartistid',
    'TXXX:MusicBrainz Release Group Id': 'musicbrainz_releasegroupid',
    'TXXX:MusicBrainz Work Id': 'musicbrainz_workid',
    'TXXX:MusicBrainz TRM Id': 'musicbrainz_trmid',
    'TXXX:MusicBrainz Disc Id': 'musicbrainz_discid',
    'TXXX:Acoustid Id': 'acoustid_id',
    'TXXX:Acoustid Fingerprint': 'acoustid_fingerprint',
    'TXXX:MusicIP PUID': 'musicip_puid',
    'TXXX:MusicMagic Fingerprint': 'musicip_fingerprint',
    WOAR: 'website',

    // id3v2.4
    TDRC: 'date', // date YYYY-MM-DD
    TYER: 'year',
    TDOR: 'originaldate',
    // 'TMCL:instrument': 'performer:instrument',
    'TIPL:arranger': 'arranger',
    'TIPL:engineer': 'engineer',
    'TIPL:producer': 'producer',
    'TIPL:DJ-mix': 'djmixer',
    'TIPL:mix': 'mixer',
    TMOO: 'mood',

    // additional mappings:
    SYLT: 'lyrics'
  }
  // ToDo: capitalization tricky
  private static ape: INativeTagMap = {
    // MusicBrainz tag mappings:
    Title: 'title',
    Artist: 'artist',
    'Album Artist': 'albumartist',
    Album: 'album',
    Year: 'year',
    ORIGINALYEAR: 'originalyear',
    Comment: 'comment',
    Track: 'track',
    Disc: 'disk',
    DISCNUMBER: 'disk', // ToDo: backwards compatibility', valid tag?
    Genre: 'genre',
    'Cover Art (Front)': 'picture',
    'Cover Art (Back)': 'picture',
    Composer: 'composer',
    Lyrics: 'lyrics',
    ALBUMSORT: 'albumsort',
    TITLESORT: 'titlesort',
    WORK: 'work',
    ARTISTSORT: 'artistsort',
    ALBUMARTISTSORT: 'albumartistsort',
    COMPOSERSORT: 'composersort',
    Lyricist: 'lyricist',
    Writer: 'writer',
    Conductor: 'conductor',
    // 'Performer=artist (instrument)': 'performer:instrument',
    MixArtist: 'remixer',
    Arranger: 'arranger',
    Engineer: 'engineer',
    Producer: 'producer',
    DJMixer: 'djmixer',
    Mixer: 'mixer',
    Label: 'label',
    Grouping: 'grouping',
    Subtitle: 'subtitle',
    DiscSubtitle: 'discsubtitle',
    Compilation: 'compilation',
    BPM: 'bpm',
    Mood: 'mood',
    Media: 'media',
    CatalogNumber: 'catalognumber',
    MUSICBRAINZ_ALBUMSTATUS: 'releasestatus',
    MUSICBRAINZ_ALBUMTYPE: 'releasetype',
    RELEASECOUNTRY: 'releasecountry',
    Script: 'script',
    Language: 'language',
    Copyright: 'copyright',
    LICENSE: 'license',
    EncodedBy: 'encodedby',
    EncoderSettings: 'encodersettings',
    Barcode: 'barcode',
    ISRC: 'isrc',
    ASIN: 'asin',
    MUSICBRAINZ_TRACKID: 'musicbrainz_recordingid',
    MUSICBRAINZ_RELEASETRACKID: 'musicbrainz_trackid',
    MUSICBRAINZ_ALBUMID: 'musicbrainz_albumid',
    MUSICBRAINZ_ARTISTID: 'musicbrainz_artistid',
    MUSICBRAINZ_ALBUMARTISTID: 'musicbrainz_albumartistid',
    MUSICBRAINZ_RELEASEGROUPID: 'musicbrainz_releasegroupid',
    MUSICBRAINZ_WORKID: 'musicbrainz_workid',
    MUSICBRAINZ_TRMID: 'musicbrainz_trmid',
    MUSICBRAINZ_DISCID: 'musicbrainz_discid',
    ACOUSTID_ID: 'acoustid_id',
    ACOUSTID_FINGERPRINT: 'acoustid_fingerprint',
    MUSICIP_PUID: 'musicip_puid',
    Weblink: 'website'
  }
  // ToDo: capitalization tricky
  private static asf: INativeTagMap = {
    // MusicBrainz tag mappings:
    Title: 'title',
    Author: 'artist',
    'WM/AlbumArtist': 'albumartist',
    'WM/AlbumTitle': 'album',
    'WM/Year': 'year',
    'WM/OriginalReleaseTime': 'originaldate',
    'WM/OriginalReleaseYear': 'originalyear',
    Description: 'comment',
    'WM/TrackNumber': 'track',
    'WM/PartOfSet': 'disk',
    'WM/Genre': 'genre',
    'WM/Composer': 'composer',
    'WM/Lyrics': 'lyrics',
    'WM/AlbumSortOrder': 'albumsort',
    'WM/TitleSortOrder': 'titlesort',
    'WM/ArtistSortOrder': 'artistsort',
    'WM/AlbumArtistSortOrder': 'albumartistsort',
    'WM/ComposerSortOrder': 'composersort',
    'WM/Writer': 'lyricist',
    'WM/Conductor': 'conductor',
    'WM/ModifiedBy': 'remixer',
    'WM/Engineer': 'engineer',
    'WM/Producer': 'producer',
    'WM/DJMixer': 'djmixer',
    'WM/Mixer': 'mixer',
    'WM/Publisher': 'label',
    'WM/ContentGroupDescription': 'grouping',
    'WM/SubTitle': 'subtitle',
    'WM/SetSubTitle': 'discsubtitle',
    // 'WM/PartOfSet': 'totaldiscs',
    'WM/IsCompilation': 'compilation',
    'WM/SharedUserRating': '_rating',
    'WM/BeatsPerMinute': 'bpm',
    'WM/Mood': 'mood',
    'WM/Media': 'media',
    'WM/CatalogNo': 'catalognumber',
    'MusicBrainz/Album Status': 'releasestatus',
    'MusicBrainz/Album Type': 'releasetype',
    'MusicBrainz/Album Release Country': 'releasecountry',
    'WM/Script': 'script',
    'WM/Language': 'language',
    Copyright: 'copyright',
    LICENSE: 'license',
    'WM/EncodedBy': 'encodedby',
    'WM/EncodingSettings': 'encodersettings',
    'WM/Barcode': 'barcode',
    'WM/ISRC': 'isrc',
    'MusicBrainz/Track Id': 'musicbrainz_recordingid',
    'MusicBrainz/Release Track Id': 'musicbrainz_trackid',
    'MusicBrainz/Album Id': 'musicbrainz_albumid',
    'MusicBrainz/Artist Id': 'musicbrainz_artistid',
    'MusicBrainz/Album Artist Id': 'musicbrainz_albumartistid',
    'MusicBrainz/Release Group Id': 'musicbrainz_releasegroupid',
    'MusicBrainz/Work Id': 'musicbrainz_workid',
    'MusicBrainz/TRM Id': 'musicbrainz_trmid',
    'MusicBrainz/Disc Id': 'musicbrainz_discid',
    'Acoustid/Id': 'acoustid_id',
    'Acoustid/Fingerprint': 'acoustid_fingerprint',
    'MusicIP/PUID': 'musicip_puid'
  }

  private static m4a: INativeTagMap = {
    '©nam': 'title',
    '©ART': 'artist',
    aART: 'albumartist',
    '©alb': 'album',
    '©day': 'date',
    '©cmt': 'comment',
    trkn: 'track',
    disk: 'disk',
    '©gen': 'genre',
    covr: 'picture',
    '©wrt': 'composer',
    '©lyr': 'lyrics',
    soal: 'albumsort',
    sonm: 'titlesort',
    soar: 'artistsort',
    soaa: 'albumartistsort',
    soco: 'composersort',
    '----:com.apple.iTunes:LYRICIST': 'lyricist',
    '----:com.apple.iTunes:CONDUCTOR': 'conductor',
    '----:com.apple.iTunes:REMIXER': 'remixer',
    '----:com.apple.iTunes:ENGINEER': 'engineer',
    '----:com.apple.iTunes:PRODUCER': 'producer',
    '----:com.apple.iTunes:DJMIXER': 'djmixer',
    '----:com.apple.iTunes:MIXER': 'mixer',
    '----:com.apple.iTunes:LABEL': 'label',
    '©grp': 'grouping',
    '----:com.apple.iTunes:SUBTITLE': 'subtitle',
    '----:com.apple.iTunes:DISCSUBTITLE': 'discsubtitle',
    cpil: 'compilation',
    tmpo: 'bpm',
    '----:com.apple.iTunes:MOOD': 'mood',
    '----:com.apple.iTunes:MEDIA': 'media',
    '----:com.apple.iTunes:CATALOGNUMBER': 'catalognumber',
    tvsh: 'show',
    sosn: 'showsort',
    pcst: 'podcast',
    purl: 'podcasturl',
    '----:com.apple.iTunes:MusicBrainz Album Status': 'releasestatus',
    '----:com.apple.iTunes:MusicBrainz Album Type': 'releasetype',
    '----:com.apple.iTunes:MusicBrainz Album Release Country': 'releasecountry',
    '----:com.apple.iTunes:SCRIPT': 'script',
    '----:com.apple.iTunes:LANGUAGE': 'language',
    cprt: 'copyright',
    '----:com.apple.iTunes:LICENSE': 'license',
    '©too': 'encodedby',
    pgap: 'gapless',
    '----:com.apple.iTunes:BARCODE': 'barcode',
    '----:com.apple.iTunes:ISRC': 'isrc',
    '----:com.apple.iTunes:ASIN': 'asin',
    '----:com.apple.iTunes:MusicBrainz Track Id': 'musicbrainz_recordingid',
    '----:com.apple.iTunes:MusicBrainz Release Track Id': 'musicbrainz_trackid',
    '----:com.apple.iTunes:MusicBrainz Album Id': 'musicbrainz_albumid',
    '----:com.apple.iTunes:MusicBrainz Artist Id': 'musicbrainz_artistid',
    '----:com.apple.iTunes:MusicBrainz Album Artist Id': 'musicbrainz_albumartistid',
    '----:com.apple.iTunes:MusicBrainz Release Group Id': 'musicbrainz_releasegroupid',
    '----:com.apple.iTunes:MusicBrainz Work Id': 'musicbrainz_workid',
    '----:com.apple.iTunes:MusicBrainz TRM Id': 'musicbrainz_trmid',
    '----:com.apple.iTunes:MusicBrainz Disc Id': 'musicbrainz_discid',
    '----:com.apple.iTunes:Acoustid Id': 'acoustid_id',
    '----:com.apple.iTunes:Acoustid Fingerprint': 'acoustid_fingerprint',
    '----:com.apple.iTunes:MusicIP PUID': 'musicip_puid',
    '----:com.apple.iTunes:fingerprint': 'musicip_fingerprint',
    // Additional mappings:
    gnre: 'genre' // ToDo: check mapping
  }

  private static capitalizeTags(map: INativeTagMap): INativeTagMap {
    let newMap: INativeTagMap = {}
    for (let tag in map) {
      if (map.hasOwnProperty(tag)) {
        newMap[tag.toUpperCase()] = map[tag]
      }
    }
    return newMap
  }

  private mappings: INativeTagMappings

  constructor() {
    // Normalize (post-process) common tag mappings
    this.mappings = {
      // capitalize 'APEv2' tags for case insensitive tag matching
      asf: TagMap.asf,
      APEv2: TagMap.capitalizeTags(TagMap.ape),
      'id3v1.1': TagMap.id3v1_1,
      'id3v2.2': TagMap.id3v2_2,
      'id3v2.3': TagMap.id3v2_3,
      'id3v2.4': TagMap.id3v2_3,
      m4a: TagMap.m4a,
      vorbis: TagMap.vorbis
    }

    this.mappings.APEv2 = TagMap.capitalizeTags(this.mappings.APEv2)

    this.mappings['id3v2.3'] = this.mappings['id3v2.4']
  }

  /**
   * Test if native tag headerType is a singleton
   * @param type e.g.: 'm4a' | 'asf' | 'id3v1.1' | 'id3v2.4' | 'vorbis'
   * @param  tag Native tag name', e.g. 'TITLE'
   * @returns {boolean} true is we can safely assume that it is a  singleton
   */
  public isNativeSingleton(type, tag): boolean {
    if (type === 'format') {
      return true
    }
    let alias = this.getCommonName(type, tag)
    return alias && TagMap.commonTags[alias].singleton
  }

  /**
   * @headerType Native header headerType: e.g.: 'm4a' | 'asf' | 'id3v1.1' | 'vorbis'
   * @tag  Native header tag
   * @return common tag name (alias)
   */
  public getCommonName(type: HeaderType, tag: string): CommonTag {
    if (!this.mappings[type]) {
      throw new Error('Illegal header headerType: ' + type)
    }
    return this.mappings[type][type === 'APEv2' ? tag.toUpperCase() : tag]
  }
}