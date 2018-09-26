window.Foxford = function(t) {
    function e(n) {
        if (r[n])
            return r[n].exports;
        var o = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(o.exports, o, o.exports, e),
        o.l = !0,
        o.exports
    }
    var r = {};
    return e.m = t,
    e.c = r,
    e.i = function(t) {
        return t
    }
    ,
    e.d = function(t, r, n) {
        e.o(t, r) || Object.defineProperty(t, r, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    }
    ,
    e.n = function(t) {
        var r = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return e.d(r, "a", r),
        r
    }
    ,
    e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    ,
    e.p = "",
    e(e.s = 2)
}([function(t, e, r) {
    "use strict";
    function n() {
        var t = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
              , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
              , r = o + t + e;
            return fetch(r, {
                credentials: "include",
                mode: "cors",
                method: "GET"
            }).then(function(t) {
                return t.json()
            })
        }
          , e = function(t) {
            if (!t.ok) {
                var e = new Error(t.status);
                throw e.res = t,
                e
            }
            return t
        };
        return {
            user: {
                me: function() {
                    return t("/api/user/me")
                    console.log(t);
                    console.log(e);
                },
                referral: function() {
                    return t("/api/users/123")
                },
                purchases: function(e) {
                    var r = e.resourceId
                      , n = e.resourceType;
                    if (r && "number" != typeof r)
                        throw new Error("resourceId must be a number");
                    if (n && "string" != typeof n)
                        throw new Error("resourceType must be a string");
                    var o = [];
                    r && o.push("resource_id=" + encodeURIComponent(r)),
                    n && o.push("resource_type=" + encodeURIComponent(n));
                    var i = o.length ? "?" + o.join("&") : "";
                    return t("/api/user/purchases", i)
                },
                signIn: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                      , e = t.redirectUrl;
                    if (e && "string" != typeof e)
                        throw new Error("redirectUrl must be a string");
                    var r = "https://foxford.ru/user/registration?redirect_url=";
                    r += e ? CSSMediaRule(e) : encodeURIComponent(document.location.href),
                    document.location.href = r
                },
                signOut: function() {
                    console.error("SignOut method is not implemented")
                }
            },
            fetchCsrfToken: function() {
                return fetch(o + "/api/csrf_token", {
                    method: "GET",
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "X-Requested-With": "XMLHttpRequest"
                    }
                }).then(e).then(function(t) {
                    return t.json()
                }).then(function(t) {
                    return t.token
                })
            },
            checkPromocode: function(t) {
                return fetch(o + "/api/promo_codes/invite/" + t, {
                    method: "GET",
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "X-Requested-With": "XMLHttpRequest"
                    }
                }).then(e).then(function(t) {
                    return t.json()
                }).catch(function(t) {
                    return console.log(t)
                })
            },
            loginUser: function(t, r) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ""
                  , i = Object.assign({
                    type: "LeadRequests::Main",
                    agreement: !0,
                    context: r
                }, t);
                return this.fetchCsrfToken().then(function(t) {
                    return fetch(o + "/api/lead_requests" + n, {
                        method: "POST",
                        credentials: "include",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRF-Token": t,
                            "X-Requested-With": "XMLHttpRequest",
                            withCredentials: !0
                        },
                        body: JSON.stringify({
                            lead_request: i
                        })
                    })
                }).then(e).then(function(t) {
                    return t
                })
            },
            ciaStatus: function(t) {
                return this.fetchCsrfToken().then(function(e) {
                    return fetch(o + "/api/rostelecom/cia_status", {
                        method: "POST",
                        credentials: "include",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRF-Token": e,
                            "X-Requested-With": "XMLHttpRequest",
                            withCredentials: !0
                        },
                        body: JSON.stringify({
                            encoded: t
                        })
                    })
                }).then(e).then(function(t) {
                    return t.json()
                })
            },
            shortURL: function(t) {
                return this.fetchCsrfToken().then(function(e) {
                    return fetch(o + "/api/short_urls", {
                        method: "POST",
                        credentials: "include",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRF-Token": e
                        },
                        body: JSON.stringify({
                            link: t
                        })
                    })
                }).then(e).then(function(t) {
                    return t.json()
                })
            }
        }
    }
    var o = "https://foxford.ru";
    t.exports = n
}
, function(t, e) {
    !function(t) {
        "use strict";
        function e(t) {
            if ("string" != typeof t && (t = String(t)),
            /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))
                throw new TypeError("Invalid character in header field name");
            return t.toLowerCase()
        }
        function r(t) {
            return "string" != typeof t && (t = String(t)),
            t
        }
        function n(t) {
            var e = {
                next: function() {
                    var e = t.shift();
                    return {
                        done: void 0 === e,
                        value: e
                    }
                }
            };
            return m.iterable && (e[Symbol.iterator] = function() {
                return e
            }
            ),
            e
        }
        function o(t) {
            this.map = {},
            t instanceof o ? t.forEach(function(t, e) {
                this.append(e, t)
            }, this) : Array.isArray(t) ? t.forEach(function(t) {
                this.append(t[0], t[1])
            }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
                this.append(e, t[e])
            }, this)
        }
        function i(t) {
            if (t.bodyUsed)
                return Promise.reject(new TypeError("Already read"));
            t.bodyUsed = !0
        }
        function s(t) {
            return new Promise(function(e, r) {
                t.onload = function() {
                    e(t.result)
                }
                ,
                t.onerror = function() {
                    r(t.error)
                }
            }
            )
        }
        function a(t) {
            var e = new FileReader
              , r = s(e);
            return e.readAsArrayBuffer(t),
            r
        }
        function u(t) {
            var e = new FileReader
              , r = s(e);
            return e.readAsText(t),
            r
        }
        function h(t) {
            for (var e = new Uint8Array(t), r = new Array(e.length), n = 0; n < e.length; n++)
                r[n] = String.fromCharCode(e[n]);
            return r.join("")
        }
        function f(t) {
            if (t.slice)
                return t.slice(0);
            var e = new Uint8Array(t.byteLength);
            return e.set(new Uint8Array(t)),
            e.buffer
        }
        function c() {
            return this.bodyUsed = !1,
            this._initBody = function(t) {
                if (this._bodyInit = t,
                t)
                    if ("string" == typeof t)
                        this._bodyText = t;
                    else if (m.blob && Blob.prototype.isPrototypeOf(t))
                        this._bodyBlob = t;
                    else if (m.formData && FormData.prototype.isPrototypeOf(t))
                        this._bodyFormData = t;
                    else if (m.searchParams && URLSearchParams.prototype.isPrototypeOf(t))
                        this._bodyText = t.toString();
                    else if (m.arrayBuffer && m.blob && v(t))
                        this._bodyArrayBuffer = f(t.buffer),
                        this._bodyInit = new Blob([this._bodyArrayBuffer]);
                    else {
                        if (!m.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t) && !T(t))
                            throw new Error("unsupported BodyInit type");
                        this._bodyArrayBuffer = f(t)
                    }
                else
                    this._bodyText = "";
                this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : m.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }
            ,
            m.blob && (this.blob = function() {
                var t = i(this);
                if (t)
                    return t;
                if (this._bodyBlob)
                    return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer)
                    return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData)
                    throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }
            ,
            this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? i(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(a)
            }
            ),
            this.text = function() {
                var t = i(this);
                if (t)
                    return t;
                if (this._bodyBlob)
                    return u(this._bodyBlob);
                if (this._bodyArrayBuffer)
                    return Promise.resolve(h(this._bodyArrayBuffer));
                if (this._bodyFormData)
                    throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }
            ,
            m.formData && (this.formData = function() {
                return this.text().then(p)
            }
            ),
            this.json = function() {
                return this.text().then(JSON.parse)
            }
            ,
            this
        }
        function d(t) {
            var e = t.toUpperCase();
            return _.indexOf(e) > -1 ? e : t
        }
        function l(t, e) {
            e = e || {};
            var r = e.body;
            if (t instanceof l) {
                if (t.bodyUsed)
                    throw new TypeError("Already read");
                this.url = t.url,
                this.credentials = t.credentials,
                e.headers || (this.headers = new o(t.headers)),
                this.method = t.method,
                this.mode = t.mode,
                r || null == t._bodyInit || (r = t._bodyInit,
                t.bodyUsed = !0)
            } else
                this.url = String(t);
            if (this.credentials = e.credentials || this.credentials || "omit",
            !e.headers && this.headers || (this.headers = new o(e.headers)),
            this.method = d(e.method || this.method || "GET"),
            this.mode = e.mode || this.mode || null,
            this.referrer = null,
            ("GET" === this.method || "HEAD" === this.method) && r)
                throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(r)
        }
        function p(t) {
            var e = new FormData;
            return t.trim().split("&").forEach(function(t) {
                if (t) {
                    var r = t.split("=")
                      , n = r.shift().replace(/\+/g, " ")
                      , o = r.join("=").replace(/\+/g, " ");
                    e.append(decodeURIComponent(n), decodeURIComponent(o))
                }
            }),
            e
        }
        function y(t) {
            var e = new o;
            return t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(t) {
                var r = t.split(":")
                  , n = r.shift().trim();
                if (n) {
                    var o = r.join(":").trim();
                    e.append(n, o)
                }
            }),
            e
        }
        function b(t, e) {
            e || (e = {}),
            this.type = "default",
            this.status = void 0 === e.status ? 200 : e.status,
            this.ok = this.status >= 200 && this.status < 300,
            this.statusText = "statusText"in e ? e.statusText : "OK",
            this.headers = new o(e.headers),
            this.url = e.url || "",
            this._initBody(t)
        }
        if (!t.fetch) {
            var m = {
                searchParams: "URLSearchParams"in t,
                iterable: "Symbol"in t && "iterator"in Symbol,
                blob: "FileReader"in t && "Blob"in t && function() {
                    try {
                        return new Blob,
                        !0
                    } catch (t) {
                        return !1
                    }
                }(),
                formData: "FormData"in t,
                arrayBuffer: "ArrayBuffer"in t
            };
            if (m.arrayBuffer)
                var w = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"]
                  , v = function(t) {
                    return t && DataView.prototype.isPrototypeOf(t)
                }
                  , T = ArrayBuffer.isView || function(t) {
                    return t && w.indexOf(Object.prototype.toString.call(t)) > -1
                }
                ;
            o.prototype.append = function(t, n) {
                t = e(t),
                n = r(n);
                var o = this.map[t];
                this.map[t] = o ? o + "," + n : n
            }
            ,
            o.prototype.delete = function(t) {
                delete this.map[e(t)]
            }
            ,
            o.prototype.get = function(t) {
                return t = e(t),
                this.has(t) ? this.map[t] : null
            }
            ,
            o.prototype.has = function(t) {
                return this.map.hasOwnProperty(e(t))
            }
            ,
            o.prototype.set = function(t, n) {
                this.map[e(t)] = r(n)
            }
            ,
            o.prototype.forEach = function(t, e) {
                for (var r in this.map)
                    this.map.hasOwnProperty(r) && t.call(e, this.map[r], r, this)
            }
            ,
            o.prototype.keys = function() {
                var t = [];
                return this.forEach(function(e, r) {
                    t.push(r)
                }),
                n(t)
            }
            ,
            o.prototype.values = function() {
                var t = [];
                return this.forEach(function(e) {
                    t.push(e)
                }),
                n(t)
            }
            ,
            o.prototype.entries = function() {
                var t = [];
                return this.forEach(function(e, r) {
                    t.push([r, e])
                }),
                n(t)
            }
            ,
            m.iterable && (o.prototype[Symbol.iterator] = o.prototype.entries);
            var _ = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            l.prototype.clone = function() {
                return new l(this,{
                    body: this._bodyInit
                })
            }
            ,
            c.call(l.prototype),
            c.call(b.prototype),
            b.prototype.clone = function() {
                return new b(this._bodyInit,{
                    status: this.status,
                    statusText: this.statusText,
                    headers: new o(this.headers),
                    url: this.url
                })
            }
            ,
            b.error = function() {
                var t = new b(null,{
                    status: 0,
                    statusText: ""
                });
                return t.type = "error",
                t
            }
            ;
            var g = [301, 302, 303, 307, 308];
            b.redirect = function(t, e) {
                if (-1 === g.indexOf(e))
                    throw new RangeError("Invalid status code");
                return new b(null,{
                    status: e,
                    headers: {
                        location: t
                    }
                })
            }
            ,
            t.Headers = o,
            t.Request = l,
            t.Response = b,
            t.fetch = function(t, e) {
                return new Promise(function(r, n) {
                    var o = new l(t,e)
                      , i = new XMLHttpRequest;
                    i.onload = function() {
                        var t = {
                            status: i.status,
                            statusText: i.statusText,
                            headers: y(i.getAllResponseHeaders() || "")
                        };
                        t.url = "responseURL"in i ? i.responseURL : t.headers.get("X-Request-URL");
                        var e = "response"in i ? i.response : i.responseText;
                        r(new b(e,t))
                    }
                    ,
                    i.onerror = function() {
                        n(new TypeError("Network request failed"))
                    }
                    ,
                    i.ontimeout = function() {
                        n(new TypeError("Network request failed"))
                    }
                    ,
                    i.open(o.method, o.url, !0),
                    "include" === o.credentials ? i.withCredentials = !0 : "omit" === o.credentials && (i.withCredentials = !1),
                    "responseType"in i && m.blob && (i.responseType = "blob"),
                    o.headers.forEach(function(t, e) {
                        i.setRequestHeader(e, t)
                    }),
                    i.send(void 0 === o._bodyInit ? null : o._bodyInit)
                }
                )
            }
            ,
            t.fetch.polyfill = !0
        }
    }("undefined" != typeof self ? self : this)
}
, function(t, e, r) {
    r(1),
    t.exports = r(0)
}
]);
