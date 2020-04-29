import {
  REQUEST_SELECTED_SONG,
  REQUEST_SELECTED_SONG_SUCCESS,
  REQUEST_SELECTED_SONG_FAILURE,
} from "../actions/selectSong";
import {
  REQUEST_SELECTED_ALBUM,
  REQUEST_SELECTED_ALBUM_FAILURE,
  REQUEST_SELECTED_ALBUM_SUCCESS,
} from "../actions/getAlbum";
import {
  REQUEST_SELECTED_ARTIST,
  REQUEST_SELECTED_ARTIST_FAILURE,
  REQUEST_SELECTED_ARTIST_SUCCESS,
} from "../actions/getArtist";
import {
  REQUEST_ALBUM_TRACKS,
  REQUEST_ALBUM_TRACKS_SUCCESS,
  REQUEST_ALBUM_TRACKS_FAILURE,
} from "../actions/getTracks";

import {
  selectedSongType,
  defaultTrack,
  defaultAlbum,
  albumType,
  track,
} from "../../../Pages/song";

export const defaultSelectedSong: selectedSongType = {
  song: {
    id: "",
    title: "",
    duration: 0,
  },
  artist: {
    name: "",
    id: "",
    image: [""],
    description: "",
    albums: [defaultAlbum],
  },
  album: {
    name: "",
    image: "",
    albumID: "",
    tracks: [defaultTrack],
  },
};

type requestSelectedType = {
  type:
    | typeof REQUEST_SELECTED_SONG
    | typeof REQUEST_SELECTED_ARTIST
    | typeof REQUEST_SELECTED_ALBUM
    | typeof REQUEST_ALBUM_TRACKS;
};

type requestSelectedFail = {
  type:
    | typeof REQUEST_SELECTED_SONG_FAILURE
    | typeof REQUEST_SELECTED_ARTIST_FAILURE
    | typeof REQUEST_SELECTED_ALBUM_FAILURE
    | typeof REQUEST_ALBUM_TRACKS_FAILURE;
  payload: {
    error: {
      error: boolean;
      message: string;
    };
  };
};

type requestSelectedSuccess = {
  type: typeof REQUEST_SELECTED_SONG_SUCCESS;
  payload: selectedSongType;
};

type requestAlbumSuccess = {
  type: typeof REQUEST_SELECTED_ALBUM_SUCCESS;
  payload: albumType[];
};

type requestArtistSuccess = {
  type: typeof REQUEST_SELECTED_ARTIST_SUCCESS;
  payload: selectedSongType["artist"];
};

type requestTracksSuccess = {
  type: typeof REQUEST_ALBUM_TRACKS_SUCCESS;
  payload: {
    albumID: string;
    tracks: Array<track>;
  };
};

type selectedSongTypes =
  | requestSelectedFail
  | requestSelectedType
  | requestSelectedSuccess
  | requestAlbumSuccess
  | requestArtistSuccess
  | requestTracksSuccess;

export const selectedSong = (
  state = defaultSelectedSong,
  action: selectedSongTypes
) => {
  switch (action.type) {
    case REQUEST_SELECTED_SONG:
    case REQUEST_SELECTED_ALBUM:
    case REQUEST_SELECTED_ARTIST:
    case REQUEST_ALBUM_TRACKS:
      return {
        ...state,
        loading: true,
        error: {
          error: false,
          message: "",
        },
      };
    case REQUEST_SELECTED_SONG_FAILURE:
    case REQUEST_SELECTED_ALBUM_FAILURE:
    case REQUEST_SELECTED_ARTIST_FAILURE:
    case REQUEST_ALBUM_TRACKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          error: true,
          message: action.payload.error.message,
        },
      };
    case REQUEST_SELECTED_SONG_SUCCESS:
      return {
        ...action.payload,
        loading: false,
        error: {
          error: false,
          message: "",
        },
      };
    case REQUEST_SELECTED_ARTIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: {
          error: false,
          message: "",
        },
      };
    case REQUEST_SELECTED_ALBUM_SUCCESS:
      return {
        ...state,
        artist: {
          ...state.artist,
          albums: action.payload,
        },
        loading: false,
        error: {
          error: false,
          message: "",
        },
      };
    case REQUEST_ALBUM_TRACKS_SUCCESS:
      const albums = state.artist.albums.map((album) => {
        if (album.albumID === action.payload.albumID) {
          return { ...album, tracks: action.payload.tracks };
        } else {
          return album;
        }
      });

      return {
        ...state,
        artist: {
          ...state.artist,
          albums: albums,
        },
      };
    default:
      return state;
  }
};
