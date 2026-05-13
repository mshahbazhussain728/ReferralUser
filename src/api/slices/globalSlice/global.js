
import axios from "axios";
import Cookies from "js-cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  modal: {
    type: "NONE",
    data: null,
  },
};

const RAW_DOMAIN = import.meta.env.VITE_API_DOMAIN || "https://apis.famocare.com";
const BASEURL = `${RAW_DOMAIN.replace(/\/$/, "")}/api/referralsystem`;

const getAuthToken = () => {
  return (
    Cookies.get("accessToken") ||
    localStorage.getItem("accessToken") ||
    (() => { try { return JSON.parse(localStorage.getItem("user") || "{}")?.token; } catch { return null; } })() ||
    (() => { try { return JSON.parse(Cookies.get("referralUser") || "{}")?.token; } catch { return null; } })() ||
    null
  );
};

// ── Compress image before upload ──────────────────────────────────────────────
const compressImage = (file, maxWidth = 400, quality = 0.7) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          "image/jpeg",
          quality
        );
      };
    };
  });
};

export const uploadFile = createAsyncThunk(
  "file/upload",
  async (data, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) return rejectWithValue("No auth token found. Please log in again.");

      let rawFile = null;
      if (data instanceof FormData) {
        rawFile = data.get("profilePic") || data.get("image") || data.get("file") || [...data.values()][0];
      } else if (data instanceof File) {
        rawFile = data;
      } else if (data instanceof FileList || Array.isArray(data)) {
        rawFile = data[0];
      }

      if (!rawFile) return rejectWithValue("No file found in provided data.");

      // ✅ Compress before uploading
      const compressed = await compressImage(rawFile, 400, 0.7);

      const formData = new FormData();
      formData.append("profilePic", compressed);

      const response = await axios.post(
        BASEURL + "/auth/upload-profile-picture",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response?.data?.imageUrl;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateModalType: (state, action) => {
      state.modal.type = action.payload.type;
      state.modal.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => { state.loading = true; })
      .addCase(uploadFile.fulfilled, (state) => { state.loading = false; })
      .addCase(uploadFile.rejected, (state) => { state.loading = false; });
  },
});

export default globalSlice.reducer;
export const { updateModalType } = globalSlice.actions;




// import axios from "axios";
// import Cookies from "js-cookie";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   loading: false,
//   modal: {
//     type: "NONE",
//     data: null,
//   },
// };

// const RAW_DOMAIN = import.meta.env.VITE_API_DOMAIN || "https://apis.famocare.com";
// const BASEURL = `${RAW_DOMAIN.replace(/\/$/, "")}/api/referralsystem`;

// const getAuthToken = () => {
//   return (
//     Cookies.get("accessToken") ||
//     localStorage.getItem("accessToken") ||
//     (() => { try { return JSON.parse(localStorage.getItem("user") || "{}")?.token; } catch { return null; } })() ||
//     (() => { try { return JSON.parse(Cookies.get("referralUser") || "{}")?.token; } catch { return null; } })() ||
//     null
//   );
// };

// // ── Compress image before upload ──────────────────────────────────────────────
// const compressImage = (file, maxWidth = 400, quality = 0.7) => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = (e) => {
//       const img = new Image();
//       img.src = e.target.result;
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         let width  = img.width;
//         let height = img.height;

//         if (width > maxWidth) {
//           height = Math.round((height * maxWidth) / width);
//           width  = maxWidth;
//         }

//         canvas.width  = width;
//         canvas.height = height;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0, width, height);

//         canvas.toBlob(
//           (blob) => {
//             const compressedFile = new File([blob], file.name, {
//               type:         "image/jpeg",
//               lastModified: Date.now(),
//             });
//             resolve(compressedFile);
//           },
//           "image/jpeg",
//           quality
//         );
//       };
//     };
//   });
// };

// export const uploadFile = createAsyncThunk(
//   "file/upload",
//   async (data, { rejectWithValue }) => {
//     try {
//       const token = getAuthToken();
//       if (!token) return rejectWithValue("No auth token found. Please log in again.");

//       let rawFile = null;
//       if (data instanceof FormData) {
//         rawFile = data.get("profilePic") || data.get("image") || data.get("file") || [...data.values()][0];
//       } else if (data instanceof File) {
//         rawFile = data;
//       } else if (data instanceof FileList || Array.isArray(data)) {
//         rawFile = data[0];
//       }

//       if (!rawFile) return rejectWithValue("No file found in provided data.");

//       // ✅ Compress before uploading
//       const compressed = await compressImage(rawFile, 400, 0.7);

//       const formData = new FormData();
//       formData.append("profilePic", compressed);

//       const response = await axios.post(
//         BASEURL + "/auth/upload-profile-picture",
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       return response?.data?.imageUrl;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// const globalSlice = createSlice({
//   name: "global",
//   initialState,
//   reducers: {
//     updateModalType: (state, action) => {
//       state.modal.type = action.payload.type;
//       state.modal.data = action.payload.data;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadFile.pending,   (state) => { state.loading = true; })
//       .addCase(uploadFile.fulfilled, (state) => { state.loading = false; })
//       .addCase(uploadFile.rejected,  (state) => { state.loading = false; });
//   },
// });

// export default globalSlice.reducer;
// export const { updateModalType } = globalSlice.actions;