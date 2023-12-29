import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet, ApiGetNoAuth, ApiPost, ApiPostNoAuth } from "../../Api/Api";
import { api } from "../../Api/AuthApi";
export const dummyAPI = createAsyncThunk("dummyAPI", async (body) => {
  return ApiGetNoAuth(api.dummyAPI)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});
export const emailVerify = createAsyncThunk("emailVerify", async (body) => {
  return ApiPostNoAuth(api.emailVerify, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});
export const userSignupWithEmail = createAsyncThunk(
  "userSignupWithEmail",
  async (body) => {
    return ApiPostNoAuth(api.userSignupWithEmail, body)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const userSignupWithMobile = createAsyncThunk(
  "userSignupWithMobile",
  async (body) => {
    return ApiPostNoAuth(api.userSignupWithMobile, body)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const mobileVerify = createAsyncThunk("mobileVerify", async (body) => {
  return ApiPostNoAuth(api.mobileVerify, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});
export const loginCheack = createAsyncThunk("loginCheack", async (body) => {
  return ApiPostNoAuth(api.loginCheack, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});
export const loginCheackWithOtp = createAsyncThunk(
  "loginCheackWithOtp",
  async (body) => {
    return ApiPostNoAuth(api.loginCheackWithOtp, body)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const loginCheackWithEmail = createAsyncThunk(
  "loginCheackWithEmail",
  async (body) => {
    return ApiPostNoAuth(api.loginCheackWithEmail, body)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const forgetPassword = createAsyncThunk(
  "forgetPassword",
  async (body) => {
    return ApiPostNoAuth(api.forgetPassword, body)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const verifyOtp = createAsyncThunk("verifyOtp", async (body) => {
  return ApiPostNoAuth(api.verifyOtp, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});
export const resetPassword = createAsyncThunk("resetPassword", async (body) => {
  return ApiPostNoAuth(api.resetPassword, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});
export const socialLogin = createAsyncThunk("socialLogin", async (body) => {
  return ApiPostNoAuth(api.socialLogin, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});
export const userDetails = createAsyncThunk("userDetails", async (body) => {
  return ApiPost(api.userDetails, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});
export const editProfile = createAsyncThunk("editProfile", async (body) => {
  return ApiPost(api.editProfile, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const emailChangeStatus = createAsyncThunk(
  "emailChangeStatus",
  async (body) => {
    return ApiGet(api.emailChangeStatus)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const changePassword = createAsyncThunk(
  "changePassword",
  async (body) => {
    return ApiPost(api.changePassword, body)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const getHomeContent = createAsyncThunk(
  "getHomeContent",
  async (body) => {
    return ApiPost(api.getHomeContent, body)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const getSearchProductResult = createAsyncThunk(
  "getSearchProductResult",
  async (body) => {
    return ApiPostNoAuth(api.getSearchProductResult, body)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const getSearchProductCategory = createAsyncThunk(
  "getSearchProductCategory",
  async (body) => {
    return ApiPostNoAuth(api.getSearchProductCategory, body)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const categoryList = createAsyncThunk("categoryList", async (body) => {
  return ApiPostNoAuth(api.categoryList, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const subcategoryList = createAsyncThunk(
  "subcategoryList",
  async (body) => {
    return ApiPostNoAuth(api.subcategoryList, body)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const resendOtp = createAsyncThunk("resendOtp", async (body) => {
  return ApiPost(api.resendOtp, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const productDetailsAPI = createAsyncThunk(
  "productDetailsAPI",
  async (body) => {
    return ApiPostNoAuth(api.ProductDetailsAPI, body)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const addToCart = createAsyncThunk("AddToCart", async (body) => {
  return ApiPost(api.AddToCart, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const addToCartTemp = createAsyncThunk("AddToCartTemp", async (body) => {
  return ApiPost(api.AddToCartTemp, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const addToWishlist = createAsyncThunk("AddToWishlist", async (body) => {
  return ApiPost(api.AddToWishlist, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const getCount = createAsyncThunk("getCount", async (body) => {
  return ApiGet(api.getCount, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const getCountTemp = createAsyncThunk("getCountTemp", async (body) => {
  return ApiPostNoAuth(api.getCountTemp, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});


export const cartList = createAsyncThunk("cartList", async (body) => {
  return ApiPost(api.cartList, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const cartListTemp = createAsyncThunk("cartListTemp", async (body) => {
  return ApiPostNoAuth(api.cartListTemp, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const RemoveFromCart = createAsyncThunk(
  "RemoveFromCart",
  async (body) => {
    return ApiPost(api.RemoveFromCart, body)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const RemoveFromCartTemp = createAsyncThunk(
  "RemoveFromCartTemp",
  async (body) => {
    return ApiPost(api.RemoveFromCartTemp, body)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const MoveMaster = createAsyncThunk("MoveMaster", async (body) => {
  return ApiPost(api.MoveMaster, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});


export const getWishlist = createAsyncThunk("getWishlist", async (body) => {
  return ApiPost(api.getWishlist, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});
export const newArrival = createAsyncThunk("newArrival", async () => {
  return ApiGet(api.newArrival)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});
export const bestSellers = createAsyncThunk("bestSellers", async () => {
  return ApiGet(api.bestSellers)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});
export const coupanCode = createAsyncThunk("coupanCode", async (body) => {
  return ApiPost(api.coupanCode,body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const coupanCodeBeforeLogin = createAsyncThunk("coupanCodeBeforeLogin", async (body) => {
  return ApiPost(api.coupanCodeBeforeLogin,body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const removeFormCartQty = createAsyncThunk("removeFormCartQty", async (body) => {
  return ApiPost(api.removeFormCartQty,body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const removeFormCartQtyTemp = createAsyncThunk("removeFormCartQtyTemp", async (body) => {
  return ApiPost(api.removeFormCartQtyTemp,body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});