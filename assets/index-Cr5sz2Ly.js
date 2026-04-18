(function() {
  const p = document.createElement("link").relList;
  if (p && p.supports && p.supports("modulepreload")) return;
  for (const w of document.querySelectorAll('link[rel="modulepreload"]')) y(w);
  new MutationObserver((w) => {
    for (const E of w) if (E.type === "childList") for (const A of E.addedNodes) A.tagName === "LINK" && A.rel === "modulepreload" && y(A);
  }).observe(document, { childList: true, subtree: true });
  function l(w) {
    const E = {};
    return w.integrity && (E.integrity = w.integrity), w.referrerPolicy && (E.referrerPolicy = w.referrerPolicy), w.crossOrigin === "use-credentials" ? E.credentials = "include" : w.crossOrigin === "anonymous" ? E.credentials = "omit" : E.credentials = "same-origin", E;
  }
  function y(w) {
    if (w.ep) return;
    w.ep = true;
    const E = l(w);
    fetch(w.href, E);
  }
})();
function Kr() {
  return typeof window.showDirectoryPicker == "function";
}
async function zn() {
  return await window.showDirectoryPicker({ mode: "read" });
}
async function Wn(h) {
  try {
    return await h.requestPermission({ mode: "read" }) === "granted";
  } catch {
    return false;
  }
}
async function Gn(h) {
  const p = [];
  let l = await bt(h, "WTF");
  l ? l = await bt(l, "Account") : l = await bt(h, "Account"), l || (l = h);
  for await (const [y, w] of l.entries()) {
    if (w.kind !== "directory") continue;
    const E = await bt(w, "SavedVariables");
    if (!E) continue;
    const A = await Jn(E, "NovaWorldBuffs.lua");
    if (!A) continue;
    const U = await A.getFile();
    p.push({ path: `${y}/SavedVariables/NovaWorldBuffs.lua`, fileHandle: A, lastMtime: U.lastModified });
  }
  return p;
}
async function qn(h) {
  let p = false;
  for (const l of h) if (l.fileHandle) try {
    const y = await l.fileHandle.getFile();
    y.lastModified !== l.lastMtime && (l.lastMtime = y.lastModified, p = true);
  } catch {
  }
  return p;
}
async function Kn(h) {
  if (!h.fileHandle) throw new Error("No file handle");
  return (await h.fileHandle.getFile()).text();
}
async function bt(h, p) {
  try {
    return await h.getDirectoryHandle(p);
  } catch {
    return null;
  }
}
async function Jn(h, p) {
  try {
    return await h.getFileHandle(p);
  } catch {
    return null;
  }
}
function Jr() {
  return typeof DataTransferItem < "u" && typeof DataTransferItem.prototype.webkitGetAsEntry == "function";
}
async function Xn(h) {
  const p = [];
  for (let l = 0; l < h.items.length; l++) {
    const w = h.items[l].webkitGetAsEntry();
    w && w.isDirectory && await Zr(w, p);
  }
  return p;
}
async function Zr(h, p) {
  const l = await $n(h);
  for (const y of l) if (y.isDirectory) await Zr(y, p);
  else if (y.isFile && y.name === "NovaWorldBuffs.lua") {
    const w = await Zn(y);
    w && p.push({ path: y.fullPath.replace(/^\//, ""), lastMtime: w.lastModified, _rawFile: w });
  }
}
function $n(h) {
  return new Promise((p, l) => {
    const y = h.createReader(), w = [];
    function E() {
      y.readEntries((A) => {
        A.length === 0 ? p(w) : (w.push(...A), E());
      }, l);
    }
    E();
  });
}
function Zn(h) {
  return new Promise((p) => {
    h.file(p, () => p(null));
  });
}
function Qn(h) {
  const p = h._rawFile;
  return p ? p.text() : Promise.reject(new Error("No raw file on DnD entry"));
}
function ea(h, p) {
  h.addEventListener("change", () => {
    const l = h.files;
    if (!l || l.length === 0) return;
    const y = [];
    for (let w = 0; w < l.length; w++) {
      const E = l[w];
      y.push({ path: E.name, lastMtime: E.lastModified, _rawFile: E });
    }
    p(y), h.value = "";
  });
}
function ta(h) {
  const p = h._rawFile;
  return p ? p.text() : Promise.reject(new Error("No raw file on picker entry"));
}
const ra = "modulepreload", na = function(h) {
  return "/" + h;
}, Xr = {}, aa = function(p, l, y) {
  let w = Promise.resolve();
  if (l && l.length > 0) {
    document.getElementsByTagName("link");
    const A = document.querySelector("meta[property=csp-nonce]"), U = A?.nonce || A?.getAttribute("nonce");
    w = Promise.allSettled(l.map((W) => {
      if (W = na(W), W in Xr) return;
      Xr[W] = true;
      const z = W.endsWith(".css"), P = z ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${W}"]${P}`)) return;
      const K = document.createElement("link");
      if (K.rel = z ? "stylesheet" : ra, z || (K.as = "script"), K.crossOrigin = "", K.href = W, U && K.setAttribute("nonce", U), document.head.appendChild(K), z) return new Promise((Q, ce) => {
        K.addEventListener("load", Q), K.addEventListener("error", () => ce(new Error(`Unable to preload CSS for ${W}`)));
      });
    }));
  }
  function E(A) {
    const U = new Event("vite:preloadError", { cancelable: true });
    if (U.payload = A, window.dispatchEvent(U), !U.defaultPrevented) throw A;
  }
  return w.then((A) => {
    for (const U of A || []) U.status === "rejected" && E(U.reason);
    return p().catch(E);
  });
};
var sa = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function wt(h) {
  throw new Error('Could not dynamically require "' + h + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var er = { exports: {} };
(function(h, p) {
  (function(l, y) {
    y(p);
  })(sa, function(l) {
    var y = typeof document < "u" ? document.currentScript : null;
    l.LuaReturn = void 0, function(b) {
      b[b.Ok = 0] = "Ok", b[b.Yield = 1] = "Yield", b[b.ErrorRun = 2] = "ErrorRun", b[b.ErrorSyntax = 3] = "ErrorSyntax", b[b.ErrorMem = 4] = "ErrorMem", b[b.ErrorErr = 5] = "ErrorErr", b[b.ErrorFile = 6] = "ErrorFile";
    }(l.LuaReturn || (l.LuaReturn = {}));
    const w = 4, E = -1, A = 1e6, U = -A - 1e3;
    l.LuaType = void 0, function(b) {
      b[b.None = -1] = "None", b[b.Nil = 0] = "Nil", b[b.Boolean = 1] = "Boolean", b[b.LightUserdata = 2] = "LightUserdata", b[b.Number = 3] = "Number", b[b.String = 4] = "String", b[b.Table = 5] = "Table", b[b.Function = 6] = "Function", b[b.Userdata = 7] = "Userdata", b[b.Thread = 8] = "Thread";
    }(l.LuaType || (l.LuaType = {})), l.LuaEventCodes = void 0, function(b) {
      b[b.Call = 0] = "Call", b[b.Ret = 1] = "Ret", b[b.Line = 2] = "Line", b[b.Count = 3] = "Count", b[b.TailCall = 4] = "TailCall";
    }(l.LuaEventCodes || (l.LuaEventCodes = {})), l.LuaEventMasks = void 0, function(b) {
      b[b.Call = 1] = "Call", b[b.Ret = 2] = "Ret", b[b.Line = 4] = "Line", b[b.Count = 8] = "Count";
    }(l.LuaEventMasks || (l.LuaEventMasks = {})), l.LuaLibraries = void 0, function(b) {
      b.Base = "_G", b.Coroutine = "coroutine", b.Table = "table", b.IO = "io", b.OS = "os", b.String = "string", b.UTF8 = "utf8", b.Math = "math", b.Debug = "debug", b.Package = "package";
    }(l.LuaLibraries || (l.LuaLibraries = {}));
    class W extends Error {
    }
    class z {
      constructor(r, a) {
        this.target = r, this.options = a;
      }
    }
    function P(b, r) {
      return new z(b, r);
    }
    class K extends Number {
    }
    class Q extends Array {
    }
    const ce = 1e3;
    class ie {
      constructor(r, a, c, u) {
        this.closed = false, this.lua = r, this.typeExtensions = a, this.address = c, this.parent = u;
      }
      newThread() {
        const r = this.lua.lua_newthread(this.address);
        if (!r) throw new Error("lua_newthread returned a null pointer");
        return new ie(this.lua, this.typeExtensions, r, this.parent || this);
      }
      resetThread() {
        this.assertOk(this.lua.lua_resetthread(this.address));
      }
      loadString(r, a) {
        const c = this.lua.module.lengthBytesUTF8(r), u = c + 1, g = this.lua.module._malloc(u);
        try {
          this.lua.module.stringToUTF8(r, g, u), this.assertOk(this.lua.luaL_loadbufferx(this.address, g, c, a ?? g, null));
        } finally {
          this.lua.module._free(g);
        }
      }
      loadFile(r) {
        this.assertOk(this.lua.luaL_loadfilex(this.address, r, null));
      }
      resume(r = 0) {
        const a = this.lua.module._malloc(w);
        try {
          return this.lua.module.setValue(a, 0, "i32"), { result: this.lua.lua_resume(this.address, null, r, a), resultCount: this.lua.module.getValue(a, "i32") };
        } finally {
          this.lua.module._free(a);
        }
      }
      getTop() {
        return this.lua.lua_gettop(this.address);
      }
      setTop(r) {
        this.lua.lua_settop(this.address, r);
      }
      remove(r) {
        return this.lua.lua_remove(this.address, r);
      }
      setField(r, a, c) {
        r = this.lua.lua_absindex(this.address, r), this.pushValue(c), this.lua.lua_setfield(this.address, r, a);
      }
      async run(r = 0, a) {
        const c = this.timeout;
        try {
          a?.timeout !== void 0 && this.setTimeout(Date.now() + a.timeout);
          let u = this.resume(r);
          for (; u.result === l.LuaReturn.Yield; ) {
            if (this.timeout && Date.now() > this.timeout) throw u.resultCount > 0 && this.pop(u.resultCount), new W("thread timeout exceeded");
            if (u.resultCount > 0) {
              const g = this.getValue(-1);
              this.pop(u.resultCount), g === Promise.resolve(g) ? await g : await new Promise((k) => setImmediate(k));
            } else await new Promise((g) => setImmediate(g));
            u = this.resume(0);
          }
          return this.assertOk(u.result), this.getStackValues();
        } finally {
          a?.timeout !== void 0 && this.setTimeout(c);
        }
      }
      runSync(r = 0) {
        const a = this.getTop() - r - 1;
        return this.assertOk(this.lua.lua_pcallk(this.address, r, E, 0, 0, null)), this.getStackValues(a);
      }
      pop(r = 1) {
        this.lua.lua_pop(this.address, r);
      }
      call(r, ...a) {
        const c = this.lua.lua_getglobal(this.address, r);
        if (c !== l.LuaType.Function) throw new Error(`A function of type '${c}' was pushed, expected is ${l.LuaType.Function}`);
        for (const g of a) this.pushValue(g);
        const u = this.getTop() - a.length - 1;
        return this.lua.lua_callk(this.address, a.length, E, 0, null), this.getStackValues(u);
      }
      getStackValues(r = 0) {
        const a = this.getTop() - r, c = new Q(a);
        for (let u = 0; u < a; u++) c[u] = this.getValue(r + u + 1);
        return c;
      }
      stateToThread(r) {
        var a;
        return r === ((a = this.parent) === null || a === void 0 ? void 0 : a.address) ? this.parent : new ie(this.lua, this.typeExtensions, r, this.parent || this);
      }
      pushValue(r, a) {
        const c = this.getValueDecorations(r), u = c.target;
        if (u instanceof ie) {
          this.lua.lua_pushthread(u.address) === 1 || this.lua.lua_xmove(u.address, this.address, 1);
          return;
        }
        const g = this.getTop();
        switch (typeof u) {
          case "undefined":
            this.lua.lua_pushnil(this.address);
            break;
          case "number":
            Number.isInteger(u) ? this.lua.lua_pushinteger(this.address, BigInt(u)) : this.lua.lua_pushnumber(this.address, u);
            break;
          case "string":
            this.lua.lua_pushstring(this.address, u);
            break;
          case "boolean":
            this.lua.lua_pushboolean(this.address, u ? 1 : 0);
            break;
          default:
            if (!this.typeExtensions.find((k) => k.extension.pushValue(this, c, a))) throw new Error(`The type '${typeof u}' is not supported by Lua`);
        }
        if (c.options.metatable && this.setMetatable(-1, c.options.metatable), this.getTop() !== g + 1) throw new Error(`pushValue expected stack size ${g + 1}, got ${this.getTop()}`);
      }
      setMetatable(r, a) {
        if (r = this.lua.lua_absindex(this.address, r), this.lua.lua_getmetatable(this.address, r)) {
          this.pop(1);
          const c = this.getMetatableName(r);
          throw new Error(`data already has associated metatable: ${c || "unknown name"}`);
        }
        this.pushValue(a), this.lua.lua_setmetatable(this.address, r);
      }
      getMetatableName(r) {
        const a = this.lua.luaL_getmetafield(this.address, r, "__name");
        if (a === l.LuaType.Nil) return;
        if (a !== l.LuaType.String) {
          this.pop(1);
          return;
        }
        const c = this.lua.lua_tolstring(this.address, -1, null);
        return this.pop(1), c;
      }
      getValue(r, a, c) {
        r = this.lua.lua_absindex(this.address, r);
        const u = a ?? this.lua.lua_type(this.address, r);
        switch (u) {
          case l.LuaType.None:
            return;
          case l.LuaType.Nil:
            return null;
          case l.LuaType.Number:
            return this.lua.lua_tonumberx(this.address, r, null);
          case l.LuaType.String:
            return this.lua.lua_tolstring(this.address, r, null);
          case l.LuaType.Boolean:
            return !!this.lua.lua_toboolean(this.address, r);
          case l.LuaType.Thread:
            return this.stateToThread(this.lua.lua_tothread(this.address, r));
          default: {
            let g;
            (u === l.LuaType.Table || u === l.LuaType.Userdata) && (g = this.getMetatableName(r));
            const k = this.typeExtensions.find((O) => O.extension.isType(this, r, u, g));
            return k ? k.extension.getValue(this, r, c) : (console.warn(`The type '${this.lua.lua_typename(this.address, u)}' returned is not supported on JS`), new K(this.lua.lua_topointer(this.address, r)));
          }
        }
      }
      close() {
        this.isClosed() || (this.hookFunctionPointer && this.lua.module.removeFunction(this.hookFunctionPointer), this.closed = true);
      }
      setTimeout(r) {
        r && r > 0 ? (this.hookFunctionPointer || (this.hookFunctionPointer = this.lua.module.addFunction(() => {
          Date.now() > r && (this.pushValue(new W("thread timeout exceeded")), this.lua.lua_error(this.address));
        }, "vii")), this.lua.lua_sethook(this.address, this.hookFunctionPointer, l.LuaEventMasks.Count, ce), this.timeout = r) : this.hookFunctionPointer && (this.hookFunctionPointer = void 0, this.timeout = void 0, this.lua.lua_sethook(this.address, null, 0, 0));
      }
      getTimeout() {
        return this.timeout;
      }
      getPointer(r) {
        return new K(this.lua.lua_topointer(this.address, r));
      }
      isClosed() {
        var r;
        return !this.address || this.closed || !!(!((r = this.parent) === null || r === void 0) && r.isClosed());
      }
      indexToString(r) {
        const a = this.lua.luaL_tolstring(this.address, r, null);
        return this.pop(), a;
      }
      dumpStack(r = console.log) {
        const a = this.getTop();
        for (let c = 1; c <= a; c++) {
          const u = this.lua.lua_type(this.address, c), g = this.lua.lua_typename(this.address, u), k = this.getPointer(c), O = this.indexToString(c), M = this.getValue(c, u);
          r(c, g, k, O, M);
        }
      }
      assertOk(r) {
        if (r !== l.LuaReturn.Ok && r !== l.LuaReturn.Yield) {
          const a = l.LuaReturn[r], c = new Error(`Lua Error(${a}/${r})`);
          if (this.getTop() > 0) if (r === l.LuaReturn.ErrorMem) c.message = this.lua.lua_tolstring(this.address, -1, null);
          else {
            const u = this.getValue(-1);
            u instanceof Error && (c.stack = u.stack), c.message = this.indexToString(-1);
          }
          if (r !== l.LuaReturn.ErrorMem) try {
            this.lua.luaL_traceback(this.address, this.address, null, 1);
            const u = this.lua.lua_tolstring(this.address, -1, null);
            u.trim() !== "stack traceback:" && (c.message = `${c.message}
${u}`), this.pop(1);
          } catch (u) {
            console.warn("Failed to generate stack trace", u);
          }
          throw c;
        }
      }
      getValueDecorations(r) {
        return r instanceof z ? r : new z(r, {});
      }
    }
    class pe extends ie {
      constructor(r, a) {
        if (a) {
          const c = { memoryUsed: 0 }, u = r.module.addFunction((k, O, M, j) => {
            if (j === 0) return O && (c.memoryUsed -= M, r.module._free(O)), 0;
            const V = O ? j - M : j, Y = c.memoryUsed + V;
            if (j > M && c.memoryMax && Y > c.memoryMax) return 0;
            const J = r.module._realloc(O, j);
            return J && (c.memoryUsed = Y), J;
          }, "iiiii"), g = r.lua_newstate(u, null);
          if (!g) throw r.module.removeFunction(u), new Error("lua_newstate returned a null pointer");
          super(r, [], g), this.memoryStats = c, this.allocatorFunctionPointer = u;
        } else super(r, [], r.luaL_newstate());
        if (this.isClosed()) throw new Error("Global state could not be created (probably due to lack of memory)");
      }
      close() {
        if (!this.isClosed()) {
          super.close(), this.lua.lua_close(this.address), this.allocatorFunctionPointer && this.lua.module.removeFunction(this.allocatorFunctionPointer);
          for (const r of this.typeExtensions) r.extension.close();
        }
      }
      registerTypeExtension(r, a) {
        this.typeExtensions.push({ extension: a, priority: r }), this.typeExtensions.sort((c, u) => u.priority - c.priority);
      }
      loadLibrary(r) {
        switch (r) {
          case l.LuaLibraries.Base:
            this.lua.luaopen_base(this.address);
            break;
          case l.LuaLibraries.Coroutine:
            this.lua.luaopen_coroutine(this.address);
            break;
          case l.LuaLibraries.Table:
            this.lua.luaopen_table(this.address);
            break;
          case l.LuaLibraries.IO:
            this.lua.luaopen_io(this.address);
            break;
          case l.LuaLibraries.OS:
            this.lua.luaopen_os(this.address);
            break;
          case l.LuaLibraries.String:
            this.lua.luaopen_string(this.address);
            break;
          case l.LuaLibraries.UTF8:
            this.lua.luaopen_string(this.address);
            break;
          case l.LuaLibraries.Math:
            this.lua.luaopen_math(this.address);
            break;
          case l.LuaLibraries.Debug:
            this.lua.luaopen_debug(this.address);
            break;
          case l.LuaLibraries.Package:
            this.lua.luaopen_package(this.address);
            break;
        }
        this.lua.lua_setglobal(this.address, r);
      }
      get(r) {
        const a = this.lua.lua_getglobal(this.address, r), c = this.getValue(-1, a);
        return this.pop(), c;
      }
      set(r, a) {
        this.pushValue(a), this.lua.lua_setglobal(this.address, r);
      }
      getTable(r, a) {
        const c = this.getTop(), u = this.lua.lua_getglobal(this.address, r);
        try {
          if (u !== l.LuaType.Table) throw new TypeError(`Unexpected type in ${r}. Expected ${l.LuaType[l.LuaType.Table]}. Got ${l.LuaType[u]}.`);
          a(c + 1);
        } finally {
          this.getTop() !== c + 1 && console.warn(`getTable: expected stack size ${c} got ${this.getTop()}`), this.setTop(c);
        }
      }
      getMemoryUsed() {
        return this.getMemoryStatsRef().memoryUsed;
      }
      getMemoryMax() {
        return this.getMemoryStatsRef().memoryMax;
      }
      setMemoryMax(r) {
        this.getMemoryStatsRef().memoryMax = r;
      }
      getMemoryStatsRef() {
        if (!this.memoryStats) throw new Error("Memory allocations is not being traced, please build engine with { traceAllocations: true }");
        return this.memoryStats;
      }
    }
    class de {
      constructor(r, a) {
        this.thread = r, this.name = a;
      }
      isType(r, a, c, u) {
        return c === l.LuaType.Userdata && u === this.name;
      }
      getValue(r, a, c) {
        const u = r.lua.luaL_testudata(r.address, a, this.name);
        if (!u) throw new Error(`data does not have the expected metatable: ${this.name}`);
        const g = r.lua.module.getValue(u, "*");
        return r.lua.getRef(g);
      }
      pushValue(r, a, c) {
        const { target: u } = a, g = r.lua.ref(u), k = r.lua.lua_newuserdatauv(r.address, w, 0);
        if (r.lua.module.setValue(k, g, "*"), l.LuaType.Nil === r.lua.luaL_getmetatable(r.address, this.name)) throw r.pop(2), new Error(`metatable not found: ${this.name}`);
        return r.lua.lua_setmetatable(r.address, -2), true;
      }
    }
    class qe extends de {
      constructor(r, a) {
        if (super(r, "js_error"), this.gcPointer = r.lua.module.addFunction((c) => {
          const u = r.lua.luaL_checkudata(c, 1, this.name), g = r.lua.module.getValue(u, "*");
          return r.lua.unref(g), l.LuaReturn.Ok;
        }, "ii"), r.lua.luaL_newmetatable(r.address, this.name)) {
          const c = r.lua.lua_gettop(r.address);
          r.lua.lua_pushstring(r.address, "protected metatable"), r.lua.lua_setfield(r.address, c, "__metatable"), r.lua.lua_pushcclosure(r.address, this.gcPointer, 0), r.lua.lua_setfield(r.address, c, "__gc"), r.pushValue((u, g) => g === "message" ? u.message : null), r.lua.lua_setfield(r.address, c, "__index"), r.pushValue((u) => u.message), r.lua.lua_setfield(r.address, c, "__tostring");
        }
        r.lua.lua_pop(r.address, 1), a && r.set("Error", { create: (c) => {
          if (c && typeof c != "string") throw new Error("message must be a string");
          return new Error(c);
        } });
      }
      pushValue(r, a) {
        return a.target instanceof Error ? super.pushValue(r, a) : false;
      }
      close() {
        this.thread.lua.module.removeFunction(this.gcPointer);
      }
    }
    function it(b, r) {
      return new qe(b, r);
    }
    class Te {
      constructor(r) {
        this.count = r;
      }
    }
    function re(b, r) {
      return new z(b, r);
    }
    class un extends de {
      constructor(r, a) {
        super(r, "js_function"), this.functionRegistry = typeof FinalizationRegistry < "u" ? new FinalizationRegistry((c) => {
          this.thread.isClosed() || this.thread.lua.luaL_unref(this.thread.address, U, c);
        }) : void 0, this.options = a, this.callbackContext = r.newThread(), this.callbackContextIndex = this.thread.lua.luaL_ref(r.address, U), this.functionRegistry || console.warn("FunctionTypeExtension: FinalizationRegistry not found. Memory leaks likely."), this.gcPointer = r.lua.module.addFunction((c) => {
          r.lua.luaL_checkudata(c, 1, this.name);
          const u = r.lua.luaL_checkudata(c, 1, this.name), g = r.lua.module.getValue(u, "*");
          return r.lua.unref(g), l.LuaReturn.Ok;
        }, "ii"), r.lua.luaL_newmetatable(r.address, this.name) && (r.lua.lua_pushstring(r.address, "__gc"), r.lua.lua_pushcclosure(r.address, this.gcPointer, 0), r.lua.lua_settable(r.address, -3), r.lua.lua_pushstring(r.address, "__metatable"), r.lua.lua_pushstring(r.address, "protected metatable"), r.lua.lua_settable(r.address, -3)), r.lua.lua_pop(r.address, 1), this.functionWrapper = r.lua.module.addFunction((c) => {
          const u = r.stateToThread(c), g = r.lua.luaL_checkudata(c, r.lua.lua_upvalueindex(1), this.name), k = r.lua.module.getValue(g, "*"), { target: O, options: M } = r.lua.getRef(k), j = u.getTop(), V = [];
          if (M.receiveThread && V.push(u), M.receiveArgsQuantity) V.push(j);
          else for (let Y = 1; Y <= j; Y++) {
            const J = u.getValue(Y);
            (Y !== 1 || !M?.self || J !== M.self) && V.push(J);
          }
          try {
            const Y = O.apply(M?.self, V);
            if (Y === void 0) return 0;
            if (Y instanceof Te) return Y.count;
            if (Y instanceof Q) {
              for (const J of Y) u.pushValue(J);
              return Y.length;
            } else return u.pushValue(Y), 1;
          } catch (Y) {
            if (Y === 1 / 0) throw Y;
            return u.pushValue(Y), u.lua.lua_error(u.address);
          }
        }, "ii");
      }
      close() {
        this.thread.lua.module.removeFunction(this.gcPointer), this.thread.lua.module.removeFunction(this.functionWrapper), this.callbackContext.close(), this.callbackContext.lua.luaL_unref(this.callbackContext.address, U, this.callbackContextIndex);
      }
      isType(r, a, c) {
        return c === l.LuaType.Function;
      }
      pushValue(r, a) {
        if (typeof a.target != "function") return false;
        const c = r.lua.ref(a), u = r.lua.lua_newuserdatauv(r.address, w, 0);
        if (r.lua.module.setValue(u, c, "*"), l.LuaType.Nil === r.lua.luaL_getmetatable(r.address, this.name)) throw r.pop(1), r.lua.unref(c), new Error(`metatable not found: ${this.name}`);
        return r.lua.lua_setmetatable(r.address, -2), r.lua.lua_pushcclosure(r.address, this.functionWrapper, 1), true;
      }
      getValue(r, a) {
        var c;
        r.lua.lua_pushvalue(r.address, a);
        const u = r.lua.luaL_ref(r.address, U), g = (...k) => {
          var O;
          if (this.callbackContext.isClosed()) {
            console.warn("Tried to call a function after closing lua state");
            return;
          }
          const M = this.callbackContext.newThread();
          try {
            const j = M.lua.lua_rawgeti(M.address, U, BigInt(u));
            if (j !== l.LuaType.Function) {
              const Y = M.lua.luaL_getmetafield(M.address, -1, "__call");
              if (M.pop(), Y !== l.LuaType.Function) throw new Error(`A value of type '${j}' was pushed but it is not callable`);
            }
            for (const Y of k) M.pushValue(Y);
            !((O = this.options) === null || O === void 0) && O.functionTimeout && M.setTimeout(Date.now() + this.options.functionTimeout);
            const V = M.lua.lua_pcallk(M.address, k.length, 1, 0, 0, null);
            if (V === l.LuaReturn.Yield) throw new Error("cannot yield in callbacks from javascript");
            return M.assertOk(V), M.getTop() > 0 ? M.getValue(-1) : void 0;
          } finally {
            M.close(), this.callbackContext.pop();
          }
        };
        return (c = this.functionRegistry) === null || c === void 0 || c.register(g, u), g;
      }
    }
    function cn(b, r) {
      return new un(b, r);
    }
    class dn extends de {
      constructor(r) {
        if (super(r, "js_null"), this.gcPointer = r.lua.module.addFunction((a) => {
          const c = r.lua.luaL_checkudata(a, 1, this.name), u = r.lua.module.getValue(c, "*");
          return r.lua.unref(u), l.LuaReturn.Ok;
        }, "ii"), r.lua.luaL_newmetatable(r.address, this.name)) {
          const a = r.lua.lua_gettop(r.address);
          r.lua.lua_pushstring(r.address, "protected metatable"), r.lua.lua_setfield(r.address, a, "__metatable"), r.lua.lua_pushcclosure(r.address, this.gcPointer, 0), r.lua.lua_setfield(r.address, a, "__gc"), r.pushValue(() => null), r.lua.lua_setfield(r.address, a, "__index"), r.pushValue(() => "null"), r.lua.lua_setfield(r.address, a, "__tostring"), r.pushValue((c, u) => c === u), r.lua.lua_setfield(r.address, a, "__eq");
        }
        r.lua.lua_pop(r.address, 1), super.pushValue(r, new z({}, {})), r.lua.lua_setglobal(r.address, "null");
      }
      getValue(r, a) {
        if (!r.lua.luaL_testudata(r.address, a, this.name)) throw new Error(`data does not have the expected metatable: ${this.name}`);
        return null;
      }
      pushValue(r, a) {
        return a?.target !== null ? false : (r.lua.lua_getglobal(r.address, "null"), true);
      }
      close() {
        this.thread.lua.module.removeFunction(this.gcPointer);
      }
    }
    function fn(b) {
      return new dn(b);
    }
    class hn extends de {
      constructor(r, a) {
        if (super(r, "js_promise"), this.gcPointer = r.lua.module.addFunction((c) => {
          const u = r.lua.luaL_checkudata(c, 1, this.name), g = r.lua.module.getValue(u, "*");
          return r.lua.unref(g), l.LuaReturn.Ok;
        }, "ii"), r.lua.luaL_newmetatable(r.address, this.name)) {
          const c = r.lua.lua_gettop(r.address);
          r.lua.lua_pushstring(r.address, "protected metatable"), r.lua.lua_setfield(r.address, c, "__metatable"), r.lua.lua_pushcclosure(r.address, this.gcPointer, 0), r.lua.lua_setfield(r.address, c, "__gc");
          const u = (g) => {
            if (Promise.resolve(g) !== g && typeof g.then != "function") throw new Error("promise method called without self instance");
            return true;
          };
          r.pushValue({ next: (g, ...k) => u(g) && g.then(...k), catch: (g, ...k) => u(g) && g.catch(...k), finally: (g, ...k) => u(g) && g.finally(...k), await: re((g, k) => {
            if (u(k), g.address === r.address) throw new Error("cannot await in the main thread");
            let O;
            const M = k.then((V) => {
              O = { status: "fulfilled", value: V };
            }).catch((V) => {
              O = { status: "rejected", value: V };
            }), j = this.thread.lua.module.addFunction((V) => {
              if (!O) return r.lua.lua_yieldk(g.address, 0, 0, j);
              this.thread.lua.module.removeFunction(j);
              const Y = r.stateToThread(V);
              if (O.status === "rejected") return Y.pushValue(O.value || new Error("promise rejected with no error")), this.thread.lua.lua_error(V);
              if (O.value instanceof Te) return O.value.count;
              if (O.value instanceof Q) {
                for (const J of O.value) Y.pushValue(J);
                return O.value.length;
              } else return Y.pushValue(O.value), 1;
            }, "iiii");
            return g.pushValue(M), new Te(r.lua.lua_yieldk(g.address, 1, 0, j));
          }, { receiveThread: true }) }), r.lua.lua_setfield(r.address, c, "__index"), r.pushValue((g, k) => g === k), r.lua.lua_setfield(r.address, c, "__eq");
        }
        r.lua.lua_pop(r.address, 1), a && r.set("Promise", { create: (c) => new Promise(c), all: (c) => {
          if (!Array.isArray(c)) throw new Error("argument must be an array of promises");
          return Promise.all(c.map((u) => Promise.resolve(u)));
        }, resolve: (c) => Promise.resolve(c) });
      }
      close() {
        this.thread.lua.module.removeFunction(this.gcPointer);
      }
      pushValue(r, a) {
        return Promise.resolve(a.target) !== a.target && typeof a.target.then != "function" ? false : super.pushValue(r, a);
      }
    }
    function mn(b, r) {
      return new hn(b, r);
    }
    function sr(b, r) {
      return new z(b, r || {});
    }
    class pn extends de {
      constructor(r) {
        if (super(r, "js_proxy"), this.gcPointer = r.lua.module.addFunction((a) => {
          const c = r.lua.luaL_checkudata(a, 1, this.name), u = r.lua.module.getValue(c, "*");
          return r.lua.unref(u), l.LuaReturn.Ok;
        }, "ii"), r.lua.luaL_newmetatable(r.address, this.name)) {
          const a = r.lua.lua_gettop(r.address);
          r.lua.lua_pushstring(r.address, "protected metatable"), r.lua.lua_setfield(r.address, a, "__metatable"), r.lua.lua_pushcclosure(r.address, this.gcPointer, 0), r.lua.lua_setfield(r.address, a, "__gc"), r.pushValue((c, u) => {
            switch (typeof u) {
              case "number":
                u = u - 1;
              case "string":
                break;
              default:
                throw new Error("Only strings or numbers can index js objects");
            }
            const g = c[u];
            return typeof g == "function" ? re(g, { self: c }) : g;
          }), r.lua.lua_setfield(r.address, a, "__index"), r.pushValue((c, u, g) => {
            switch (typeof u) {
              case "number":
                u = u - 1;
              case "string":
                break;
              default:
                throw new Error("Only strings or numbers can index js objects");
            }
            c[u] = g;
          }), r.lua.lua_setfield(r.address, a, "__newindex"), r.pushValue((c) => {
            var u, g;
            return (g = (u = c.toString) === null || u === void 0 ? void 0 : u.call(c)) !== null && g !== void 0 ? g : typeof c;
          }), r.lua.lua_setfield(r.address, a, "__tostring"), r.pushValue((c) => c.length || 0), r.lua.lua_setfield(r.address, a, "__len"), r.pushValue((c) => {
            const u = Object.getOwnPropertyNames(c);
            let g = 0;
            return Q.of(() => {
              const k = Q.of(u[g], c[u[g]]);
              return g++, k;
            }, c, null);
          }), r.lua.lua_setfield(r.address, a, "__pairs"), r.pushValue((c, u) => c === u), r.lua.lua_setfield(r.address, a, "__eq"), r.pushValue((c, ...u) => (u[0] === c && u.shift(), c(...u))), r.lua.lua_setfield(r.address, a, "__call");
        }
        r.lua.lua_pop(r.address, 1);
      }
      isType(r, a, c, u) {
        return c === l.LuaType.Userdata && u === this.name;
      }
      getValue(r, a) {
        const c = r.lua.lua_touserdata(r.address, a), u = r.lua.module.getValue(c, "*");
        return r.lua.getRef(u);
      }
      pushValue(r, a) {
        var c;
        const { target: u, options: g } = a;
        if (g.proxy === void 0) {
          if (u == null || typeof u != "object" && !(typeof u == "function" && ((c = u.prototype) === null || c === void 0 ? void 0 : c.constructor) === u && u.toString().startsWith("class ")) || Promise.resolve(u) === u || typeof u.then == "function") return false;
        } else if (g.proxy === false) return false;
        return g.metatable && !(g.metatable instanceof z) ? (a.options.metatable = sr(g.metatable, { proxy: false }), false) : super.pushValue(r, a);
      }
      close() {
        this.thread.lua.module.removeFunction(this.gcPointer);
      }
    }
    function _n(b) {
      return new pn(b);
    }
    class gn extends de {
      constructor(r) {
        super(r, "js_table");
      }
      close() {
      }
      isType(r, a, c) {
        return c === l.LuaType.Table;
      }
      getValue(r, a, c) {
        const u = c || /* @__PURE__ */ new Map(), g = r.lua.lua_topointer(r.address, a);
        let k = u.get(g);
        if (!k) {
          const O = this.readTableKeys(r, a);
          k = O.length > 0 && O.every((j, V) => j === String(V + 1)) ? [] : {}, u.set(g, k), this.readTableValues(r, a, u, k);
        }
        return k;
      }
      pushValue(r, { target: a }, c) {
        if (typeof a != "object" || a === null) return false;
        const u = c || /* @__PURE__ */ new Map(), g = u.get(a);
        if (g !== void 0) return r.lua.lua_rawgeti(r.address, U, BigInt(g)), true;
        try {
          const k = r.getTop() + 1, O = (M, j) => {
            r.lua.lua_createtable(r.address, M, j);
            const V = r.lua.luaL_ref(r.address, U);
            u.set(a, V), r.lua.lua_rawgeti(r.address, U, BigInt(V));
          };
          if (Array.isArray(a)) {
            O(a.length, 0);
            for (let M = 0; M < a.length; M++) r.pushValue(M + 1, u), r.pushValue(a[M], u), r.lua.lua_settable(r.address, k);
          } else {
            O(0, Object.getOwnPropertyNames(a).length);
            for (const M in a) r.pushValue(M, u), r.pushValue(a[M], u), r.lua.lua_settable(r.address, k);
          }
        } finally {
          if (c === void 0) for (const k of u.values()) r.lua.luaL_unref(r.address, U, k);
        }
        return true;
      }
      readTableKeys(r, a) {
        const c = [];
        for (r.lua.lua_pushnil(r.address); r.lua.lua_next(r.address, a); ) {
          const u = r.indexToString(-2);
          c.push(u), r.pop();
        }
        return c;
      }
      readTableValues(r, a, c, u) {
        const g = Array.isArray(u);
        for (r.lua.lua_pushnil(r.address); r.lua.lua_next(r.address, a); ) {
          const k = r.indexToString(-2), O = r.getValue(-1, void 0, c);
          g ? u.push(O) : u[k] = O, r.pop();
        }
      }
    }
    function bn(b) {
      return new gn(b);
    }
    function wn(b) {
      return new z(b, { reference: true });
    }
    class yn extends de {
      constructor(r) {
        if (super(r, "js_userdata"), this.gcPointer = r.lua.module.addFunction((a) => {
          const c = r.lua.luaL_checkudata(a, 1, this.name), u = r.lua.module.getValue(c, "*");
          return r.lua.unref(u), l.LuaReturn.Ok;
        }, "ii"), r.lua.luaL_newmetatable(r.address, this.name)) {
          const a = r.lua.lua_gettop(r.address);
          r.lua.lua_pushstring(r.address, "protected metatable"), r.lua.lua_setfield(r.address, a, "__metatable"), r.lua.lua_pushcclosure(r.address, this.gcPointer, 0), r.lua.lua_setfield(r.address, a, "__gc");
        }
        r.lua.lua_pop(r.address, 1);
      }
      isType(r, a, c, u) {
        return c === l.LuaType.Userdata && u === this.name;
      }
      getValue(r, a) {
        const c = r.lua.lua_touserdata(r.address, a), u = r.lua.module.getValue(c, "*");
        return r.lua.getRef(u);
      }
      pushValue(r, a) {
        return a.options.reference ? super.pushValue(r, a) : false;
      }
      close() {
        this.thread.lua.module.removeFunction(this.gcPointer);
      }
    }
    function vn(b) {
      return new yn(b);
    }
    class ir {
      constructor(r, { openStandardLibs: a = true, injectObjects: c = false, enableProxy: u = true, traceAllocations: g = false, functionTimeout: k = void 0 } = {}) {
        this.cmodule = r, this.global = new pe(this.cmodule, g), this.global.registerTypeExtension(0, bn(this.global)), this.global.registerTypeExtension(0, cn(this.global, { functionTimeout: k })), this.global.registerTypeExtension(1, mn(this.global, c)), c && this.global.registerTypeExtension(5, fn(this.global)), u ? this.global.registerTypeExtension(3, _n(this.global)) : this.global.registerTypeExtension(1, it(this.global, c)), this.global.registerTypeExtension(4, vn(this.global)), a && this.cmodule.luaL_openlibs(this.global.address);
      }
      doString(r) {
        return this.callByteCode((a) => a.loadString(r));
      }
      doFile(r) {
        return this.callByteCode((a) => a.loadFile(r));
      }
      doStringSync(r) {
        return this.global.loadString(r), this.global.runSync()[0];
      }
      doFileSync(r) {
        return this.global.loadFile(r), this.global.runSync()[0];
      }
      async callByteCode(r) {
        const a = this.global.newThread(), c = this.global.getTop();
        try {
          r(a);
          const u = await a.run(0);
          return u.length > 0 ? (this.cmodule.lua_xmove(a.address, this.global.address, u.length), this.global.getValue(this.global.getTop() - u.length + 1)) : void 0;
        } finally {
          this.global.remove(c);
        }
      }
    }
    var En = (() => {
      var b = typeof document > "u" && typeof location > "u" ? wt("url").pathToFileURL(__filename).href : typeof document > "u" ? location.href : y && y.src || new URL("index.js", document.baseURI).href;
      return async function(r = {}) {
        var a = r, c, u;
        a.ready = new Promise((e, t) => {
          c = e, u = t;
        }), "_malloc _free _realloc _luaL_checkversion_ _luaL_getmetafield _luaL_callmeta _luaL_tolstring _luaL_argerror _luaL_typeerror _luaL_checklstring _luaL_optlstring _luaL_checknumber _luaL_optnumber _luaL_checkinteger _luaL_optinteger _luaL_checkstack _luaL_checktype _luaL_checkany _luaL_newmetatable _luaL_setmetatable _luaL_testudata _luaL_checkudata _luaL_where _luaL_fileresult _luaL_execresult _luaL_ref _luaL_unref _luaL_loadfilex _luaL_loadbufferx _luaL_loadstring _luaL_newstate _luaL_len _luaL_addgsub _luaL_gsub _luaL_setfuncs _luaL_getsubtable _luaL_traceback _luaL_requiref _luaL_buffinit _luaL_prepbuffsize _luaL_addlstring _luaL_addstring _luaL_addvalue _luaL_pushresult _luaL_pushresultsize _luaL_buffinitsize _lua_newstate _lua_close _lua_newthread _lua_resetthread _lua_atpanic _lua_version _lua_absindex _lua_gettop _lua_settop _lua_pushvalue _lua_rotate _lua_copy _lua_checkstack _lua_xmove _lua_isnumber _lua_isstring _lua_iscfunction _lua_isinteger _lua_isuserdata _lua_type _lua_typename _lua_tonumberx _lua_tointegerx _lua_toboolean _lua_tolstring _lua_rawlen _lua_tocfunction _lua_touserdata _lua_tothread _lua_topointer _lua_arith _lua_rawequal _lua_compare _lua_pushnil _lua_pushnumber _lua_pushinteger _lua_pushlstring _lua_pushstring _lua_pushcclosure _lua_pushboolean _lua_pushlightuserdata _lua_pushthread _lua_getglobal _lua_gettable _lua_getfield _lua_geti _lua_rawget _lua_rawgeti _lua_rawgetp _lua_createtable _lua_newuserdatauv _lua_getmetatable _lua_getiuservalue _lua_setglobal _lua_settable _lua_setfield _lua_seti _lua_rawset _lua_rawseti _lua_rawsetp _lua_setmetatable _lua_setiuservalue _lua_callk _lua_pcallk _lua_load _lua_dump _lua_yieldk _lua_resume _lua_status _lua_isyieldable _lua_setwarnf _lua_warning _lua_error _lua_next _lua_concat _lua_len _lua_stringtonumber _lua_getallocf _lua_setallocf _lua_toclose _lua_closeslot _lua_getstack _lua_getinfo _lua_getlocal _lua_setlocal _lua_getupvalue _lua_setupvalue _lua_upvalueid _lua_upvaluejoin _lua_sethook _lua_gethook _lua_gethookmask _lua_gethookcount _lua_setcstacklimit _luaopen_base _luaopen_coroutine _luaopen_table _luaopen_io _luaopen_os _luaopen_string _luaopen_utf8 _luaopen_math _luaopen_debug _luaopen_package _luaL_openlibs _memory ___indirect_function_table _fflush onRuntimeInitialized".split(" ").forEach((e) => {
          Object.getOwnPropertyDescriptor(a.ready, e) || Object.defineProperty(a.ready, e, { get: () => X("You are getting " + e + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"), set: () => X("You are setting " + e + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js") });
        });
        var g = Object.assign({}, a), k = "./this.program", O = (e, t) => {
          throw t;
        }, M = typeof window == "object", j = typeof importScripts == "function", V = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string", Y = !M && !V && !j;
        if (a.ENVIRONMENT) throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
        var J = "", Pe, Re, Ie;
        if (V) {
          if (typeof process > "u" || !process.release || process.release.name !== "node") throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
          var or = process.versions.node, Ke = or.split(".").slice(0, 3);
          if (Ke = 1e4 * Ke[0] + 100 * Ke[1] + 1 * Ke[2].split("-")[0], 16e4 > Ke) throw Error("This emscripten-generated code requires node v16.0.0 (detected v" + or + ")");
          const { createRequire: e } = await aa(async () => {
            const { createRequire: t } = await Promise.resolve().then(() => Ha);
            return { createRequire: t };
          }, void 0);
          var xe = e(typeof document > "u" && typeof location > "u" ? wt("url").pathToFileURL(__filename).href : typeof document > "u" ? location.href : y && y.src || new URL("index.js", document.baseURI).href), Lt = xe("fs"), Tt = xe("path");
          j ? J = Tt.dirname(J) + "/" : J = xe("url").fileURLToPath(new URL("./", typeof document > "u" && typeof location > "u" ? wt("url").pathToFileURL(__filename).href : typeof document > "u" ? location.href : y && y.src || new URL("index.js", document.baseURI).href)), Pe = (t, n) => (t = Qe(t) ? new URL(t) : Tt.normalize(t), Lt.readFileSync(t, n ? void 0 : "utf8")), Ie = (t) => (t = Pe(t, true), t.buffer || (t = new Uint8Array(t)), v(t.buffer), t), Re = (t, n, s, o = true) => {
            t = Qe(t) ? new URL(t) : Tt.normalize(t), Lt.readFile(t, o ? void 0 : "utf8", (d, _) => {
              d ? s(d) : n(o ? _.buffer : _);
            });
          }, !a.thisProgram && 1 < process.argv.length && (k = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), O = (t, n) => {
            throw process.exitCode = t, n;
          }, a.inspect = () => "[Emscripten Module object]";
        } else if (Y) {
          if (typeof process == "object" && typeof xe == "function" || typeof window == "object" || typeof importScripts == "function") throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
          typeof read < "u" && (Pe = read), Ie = (e) => typeof readbuffer == "function" ? new Uint8Array(readbuffer(e)) : (e = read(e, "binary"), v(typeof e == "object"), e), Re = (e, t) => {
            setTimeout(() => t(Ie(e)));
          }, typeof clearTimeout > "u" && (globalThis.clearTimeout = () => {
          }), typeof setTimeout > "u" && (globalThis.setTimeout = (e) => typeof e == "function" ? e() : X()), typeof quit == "function" && (O = (e, t) => {
            throw setTimeout(() => {
              if (!(t instanceof yr)) {
                let n = t;
                t && typeof t == "object" && t.stack && (n = [t, t.stack]), $(`exiting due to exception: ${n}`);
              }
              quit(e);
            }), t;
          }), typeof print < "u" && (typeof console > "u" && (console = {}), console.log = print, console.warn = console.error = typeof printErr < "u" ? printErr : print);
        } else if (M || j) {
          if (j ? J = self.location.href : typeof document < "u" && document.currentScript && (J = document.currentScript.src), b && (J = b), J.indexOf("blob:") !== 0 ? J = J.substr(0, J.replace(/[?#].*/, "").lastIndexOf("/") + 1) : J = "", typeof window != "object" && typeof importScripts != "function") throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
          Pe = (e) => {
            var t = new XMLHttpRequest();
            return t.open("GET", e, false), t.send(null), t.responseText;
          }, j && (Ie = (e) => {
            var t = new XMLHttpRequest();
            return t.open("GET", e, false), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
          }), Re = (e, t, n) => {
            var s = new XMLHttpRequest();
            s.open("GET", e, true), s.responseType = "arraybuffer", s.onload = () => {
              s.status == 200 || s.status == 0 && s.response ? t(s.response) : n();
            }, s.onerror = n, s.send(null);
          };
        } else throw Error("environment detection error");
        var Ue = console.log.bind(console), $ = console.error.bind(console);
        Object.assign(a, g), g = null, C("ENVIRONMENT"), C("GL_MAX_TEXTURE_IMAGE_UNITS"), C("SDL_canPlayWithWebAudio"), C("SDL_numSimultaneouslyQueuedBuffers"), C("INITIAL_MEMORY"), C("wasmMemory"), C("arguments"), C("buffer"), C("canvas"), C("doNotCaptureKeyboard"), C("dynamicLibraries"), C("elementPointerLock"), C("extraStackTrace"), C("forcedAspectRatio"), C("instantiateWasm"), C("keyboardListeningElement"), C("freePreloadedMediaOnUse"), C("loadSplitModule"), C("logReadFiles"), C("mainScriptUrlOrBlob"), C("mem"), C("monitorRunDependencies"), C("noExitRuntime"), C("noInitialRun"), C("onAbort"), C("onCustomMessage"), C("onExit"), C("onFree"), C("onFullScreen"), C("onMalloc"), C("onRealloc"), C("onRuntimeInitialized"), C("postMainLoop"), C("postRun"), C("preInit"), C("preMainLoop"), C("preinitializedWebGLContext"), C("memoryInitializerRequest"), C("preloadPlugins"), C("print"), C("printErr"), C("quit"), C("setStatus"), C("statusMessage"), C("stderr"), C("stdin"), C("stdout"), C("thisProgram"), C("wasm"), C("wasmBinary"), C("websocket"), C("fetchSettings"), _e("arguments", "arguments_"), _e("thisProgram", "thisProgram"), _e("quit", "quit_"), v(typeof a.memoryInitializerPrefixURL > "u", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"), v(typeof a.pthreadMainPrefixURL > "u", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"), v(typeof a.cdInitializerPrefixURL > "u", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"), v(typeof a.filePackagePrefixURL > "u", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead"), v(typeof a.read > "u", "Module.read option was removed (modify read_ in JS)"), v(typeof a.readAsync > "u", "Module.readAsync option was removed (modify readAsync in JS)"), v(typeof a.readBinary > "u", "Module.readBinary option was removed (modify readBinary in JS)"), v(typeof a.setWindowTitle > "u", "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)"), v(typeof a.TOTAL_MEMORY > "u", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"), _e("asm", "wasmExports"), _e("read", "read_"), _e("readAsync", "readAsync"), _e("readBinary", "readBinary"), _e("setWindowTitle", "setWindowTitle"), v(!Y, "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable."), _e("wasmBinary", "wasmBinary"), typeof WebAssembly != "object" && X("no native wasm support detected");
        var Je, Xe = false;
        function v(e, t) {
          e || X("Assertion failed" + (t ? ": " + t : ""));
        }
        var ee, lt, Be, S, q, kt, ut, St;
        function lr() {
          var e = Je.buffer;
          a.HEAP8 = ee = new Int8Array(e), a.HEAP16 = Be = new Int16Array(e), a.HEAPU8 = lt = new Uint8Array(e), a.HEAPU16 = new Uint16Array(e), a.HEAP32 = S = new Int32Array(e), a.HEAPU32 = q = new Uint32Array(e), a.HEAPF32 = kt = new Float32Array(e), a.HEAPF64 = St = new Float64Array(e), a.HEAP64 = ut = new BigInt64Array(e), a.HEAPU64 = new BigUint64Array(e);
        }
        v(!a.STACK_SIZE, "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time"), v(typeof Int32Array < "u" && typeof Float64Array < "u" && Int32Array.prototype.subarray != null && Int32Array.prototype.set != null, "JS engine does not provide full typed array support"), v(!a.wasmMemory, "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally"), v(!a.INITIAL_MEMORY, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
        function Ft() {
          if (!Xe) {
            var e = Kt();
            e == 0 && (e += 4);
            var t = q[e >> 2], n = q[e + 4 >> 2];
            t == 34821223 && n == 2310721022 || X(`Stack overflow! Stack cookie has been overwritten at ${et(e)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${et(n)} ${et(t)}`), q[0] != 1668509029 && X("Runtime error: The application has corrupted its heap memory area (address zero)!");
          }
        }
        var ur = new Int16Array(1), cr = new Int8Array(ur.buffer);
        if (ur[0] = 25459, cr[0] !== 115 || cr[1] !== 99) throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
        var Mt = [], Ct = [], dr = [], Dt = false;
        v(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"), v(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"), v(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"), v(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
        var $e = 0, ke = null, Ze = null, Ve = {};
        function fr(e) {
          for (var t = e; ; ) {
            if (!Ve[e]) return e;
            e = t + Math.random();
          }
        }
        function Nt(e) {
          $e++, e ? (v(!Ve[e]), Ve[e] = 1, ke === null && typeof setInterval < "u" && (ke = setInterval(() => {
            if (Xe) clearInterval(ke), ke = null;
            else {
              var t = false, n;
              for (n in Ve) t || (t = true, $("still waiting on run dependencies:")), $(`dependency: ${n}`);
              t && $("(end of list)");
            }
          }, 1e4))) : $("warning: run dependency added without ID");
        }
        function ct(e) {
          $e--, e ? (v(Ve[e]), delete Ve[e]) : $("warning: run dependency removed without ID"), $e == 0 && (ke !== null && (clearInterval(ke), ke = null), Ze && (e = Ze, Ze = null, e()));
        }
        function X(e) {
          throw e = "Aborted(" + e + ")", $(e), Xe = true, e = new WebAssembly.RuntimeError(e), u(e), e;
        }
        var hr = (e) => e.startsWith("data:application/octet-stream;base64,"), Qe = (e) => e.startsWith("file://");
        function f(e) {
          return function() {
            v(Dt, `native function \`${e}\` called before runtime initialization`);
            var t = Ae[e];
            return v(t, `exported native function \`${e}\` not found`), t.apply(null, arguments);
          };
        }
        var ve;
        if (a.locateFile) {
          if (ve = "glue.wasm", !hr(ve)) {
            var mr = ve;
            ve = a.locateFile ? a.locateFile(mr, J) : J + mr;
          }
        } else ve = new URL("glue.wasm", typeof document > "u" && typeof location > "u" ? wt("url").pathToFileURL(__filename).href : typeof document > "u" ? location.href : y && y.src || new URL("index.js", document.baseURI).href).href;
        function pr(e) {
          if (Ie) return Ie(e);
          throw "both async and sync fetching of the wasm failed";
        }
        function kn(e) {
          if (M || j) {
            if (typeof fetch == "function" && !Qe(e)) return fetch(e, { credentials: "same-origin" }).then((t) => {
              if (!t.ok) throw "failed to load wasm binary file at '" + e + "'";
              return t.arrayBuffer();
            }).catch(() => pr(e));
            if (Re) return new Promise((t, n) => {
              Re(e, (s) => t(new Uint8Array(s)), n);
            });
          }
          return Promise.resolve().then(() => pr(e));
        }
        function _r(e, t, n) {
          return kn(e).then((s) => WebAssembly.instantiate(s, t)).then((s) => s).then(n, (s) => {
            $(`failed to asynchronously prepare wasm: ${s}`), Qe(ve) && $(`warning: Loading from a file URI (${ve}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`), X(s);
          });
        }
        function Sn(e, t) {
          var n = ve;
          return typeof WebAssembly.instantiateStreaming != "function" || hr(n) || Qe(n) || V || typeof fetch != "function" ? _r(n, e, t) : fetch(n, { credentials: "same-origin" }).then((s) => WebAssembly.instantiateStreaming(s, e).then(t, function(o) {
            return $(`wasm streaming compile failed: ${o}`), $("falling back to ArrayBuffer instantiation"), _r(n, e, t);
          }));
        }
        function _e(e, t) {
          Object.getOwnPropertyDescriptor(a, e) || Object.defineProperty(a, e, { configurable: true, get() {
            X(`\`Module.${e}\` has been replaced by \`${t}\` (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)`);
          } });
        }
        function C(e) {
          Object.getOwnPropertyDescriptor(a, e) && X(`\`Module.${e}\` was supplied but \`${e}\` not included in INCOMING_MODULE_JS_API`);
        }
        function gr(e) {
          return e === "FS_createPath" || e === "FS_createDataFile" || e === "FS_createPreloadedFile" || e === "FS_unlink" || e === "addRunDependency" || e === "FS_createLazyFile" || e === "FS_createDevice" || e === "removeRunDependency";
        }
        function br(e, t) {
          typeof globalThis < "u" && Object.defineProperty(globalThis, e, { configurable: true, get() {
            je(`\`${e}\` is not longer defined by emscripten. ${t}`);
          } });
        }
        br("buffer", "Please use HEAP8.buffer or wasmMemory.buffer"), br("asm", "Please use wasmExports instead");
        function wr(e) {
          Object.getOwnPropertyDescriptor(a, e) || Object.defineProperty(a, e, { configurable: true, get() {
            var t = `'${e}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
            gr(e) && (t += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"), X(t);
          } });
        }
        function yr(e) {
          this.name = "ExitStatus", this.message = `Program terminated with exit(${e})`, this.status = e;
        }
        var et = (e) => (v(typeof e == "number"), "0x" + (e >>> 0).toString(16).padStart(8, "0")), je = (e) => {
          At ||= {}, At[e] || (At[e] = 1, V && (e = "warning: " + e), $(e));
        }, At, vr = (e, t) => {
          for (var n = 0, s = e.length - 1; 0 <= s; s--) {
            var o = e[s];
            o === "." ? e.splice(s, 1) : o === ".." ? (e.splice(s, 1), n++) : n && (e.splice(s, 1), n--);
          }
          if (t) for (; n; n--) e.unshift("..");
          return e;
        }, ge = (e) => {
          var t = e.charAt(0) === "/", n = e.substr(-1) === "/";
          return (e = vr(e.split("/").filter((s) => !!s), !t).join("/")) || t || (e = "."), e && n && (e += "/"), (t ? "/" : "") + e;
        }, Ot = (e) => {
          var t = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);
          return e = t[0], t = t[1], !e && !t ? "." : (t &&= t.substr(0, t.length - 1), e + t);
        }, Se = (e) => {
          if (e === "/") return "/";
          e = ge(e), e = e.replace(/\/$/, "");
          var t = e.lastIndexOf("/");
          return t === -1 ? e : e.substr(t + 1);
        }, Fn = (e, t) => ge(e + "/" + t), Mn = () => {
          if (typeof crypto == "object" && typeof crypto.getRandomValues == "function") return (n) => crypto.getRandomValues(n);
          if (V) try {
            var e = xe("crypto");
            if (e.randomFillSync) return (n) => e.randomFillSync(n);
            var t = e.randomBytes;
            return (n) => (n.set(t(n.byteLength)), n);
          } catch {
          }
          X("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
        }, Er = (e) => (Er = Mn())(e);
        function Fe() {
          for (var e = "", t = false, n = arguments.length - 1; -1 <= n && !t; n--) {
            if (t = 0 <= n ? arguments[n] : i.cwd(), typeof t != "string") throw new TypeError("Arguments to path.resolve must be strings");
            if (!t) return "";
            e = t + "/" + e, t = t.charAt(0) === "/";
          }
          return e = vr(e.split("/").filter((s) => !!s), !t).join("/"), (t ? "/" : "") + e || ".";
        }
        var Lr = (e, t) => {
          function n(_) {
            for (var L = 0; L < _.length && _[L] === ""; L++) ;
            for (var I = _.length - 1; 0 <= I && _[I] === ""; I--) ;
            return L > I ? [] : _.slice(L, I - L + 1);
          }
          e = Fe(e).substr(1), t = Fe(t).substr(1), e = n(e.split("/")), t = n(t.split("/"));
          for (var s = Math.min(e.length, t.length), o = s, d = 0; d < s; d++) if (e[d] !== t[d]) {
            o = d;
            break;
          }
          for (s = [], d = o; d < e.length; d++) s.push("..");
          return s = s.concat(t.slice(o)), s.join("/");
        }, Tr = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0, He = (e, t) => {
          for (var n = t + NaN, s = t; e[s] && !(s >= n); ) ++s;
          if (16 < s - t && e.buffer && Tr) return Tr.decode(e.subarray(t, s));
          for (n = ""; t < s; ) {
            var o = e[t++];
            if (o & 128) {
              var d = e[t++] & 63;
              if ((o & 224) == 192) n += String.fromCharCode((o & 31) << 6 | d);
              else {
                var _ = e[t++] & 63;
                (o & 240) == 224 ? o = (o & 15) << 12 | d << 6 | _ : ((o & 248) != 240 && je("Invalid UTF-8 leading byte " + et(o) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), o = (o & 7) << 18 | d << 12 | _ << 6 | e[t++] & 63), 65536 > o ? n += String.fromCharCode(o) : (o -= 65536, n += String.fromCharCode(55296 | o >> 10, 56320 | o & 1023));
              }
            } else n += String.fromCharCode(o);
          }
          return n;
        }, Pt = [], Ye = (e) => {
          for (var t = 0, n = 0; n < e.length; ++n) {
            var s = e.charCodeAt(n);
            127 >= s ? t++ : 2047 >= s ? t += 2 : 55296 <= s && 57343 >= s ? (t += 4, ++n) : t += 3;
          }
          return t;
        }, Rt = (e, t, n, s) => {
          if (v(typeof e == "string", `stringToUTF8Array expects a string (got ${typeof e})`), !(0 < s)) return 0;
          var o = n;
          s = n + s - 1;
          for (var d = 0; d < e.length; ++d) {
            var _ = e.charCodeAt(d);
            if (55296 <= _ && 57343 >= _) {
              var L = e.charCodeAt(++d);
              _ = 65536 + ((_ & 1023) << 10) | L & 1023;
            }
            if (127 >= _) {
              if (n >= s) break;
              t[n++] = _;
            } else {
              if (2047 >= _) {
                if (n + 1 >= s) break;
                t[n++] = 192 | _ >> 6;
              } else {
                if (65535 >= _) {
                  if (n + 2 >= s) break;
                  t[n++] = 224 | _ >> 12;
                } else {
                  if (n + 3 >= s) break;
                  1114111 < _ && je("Invalid Unicode code point " + et(_) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF)."), t[n++] = 240 | _ >> 18, t[n++] = 128 | _ >> 12 & 63;
                }
                t[n++] = 128 | _ >> 6 & 63;
              }
              t[n++] = 128 | _ & 63;
            }
          }
          return t[n] = 0, n - o;
        };
        function dt(e, t) {
          var n = Array(Ye(e) + 1);
          return e = Rt(e, n, 0, n.length), t && (n.length = e), n;
        }
        var It = [];
        function kr(e, t) {
          It[e] = { input: [], output: [], K: t }, Ut(e, Cn);
        }
        var Cn = { open(e) {
          var t = It[e.node.rdev];
          if (!t) throw new i.g(43);
          e.tty = t, e.seekable = false;
        }, close(e) {
          e.tty.K.fsync(e.tty);
        }, fsync(e) {
          e.tty.K.fsync(e.tty);
        }, read(e, t, n, s) {
          if (!e.tty || !e.tty.K.ra) throw new i.g(60);
          for (var o = 0, d = 0; d < s; d++) {
            try {
              var _ = e.tty.K.ra(e.tty);
            } catch {
              throw new i.g(29);
            }
            if (_ === void 0 && o === 0) throw new i.g(6);
            if (_ == null) break;
            o++, t[n + d] = _;
          }
          return o && (e.node.timestamp = Date.now()), o;
        }, write(e, t, n, s) {
          if (!e.tty || !e.tty.K.ia) throw new i.g(60);
          try {
            for (var o = 0; o < s; o++) e.tty.K.ia(e.tty, t[n + o]);
          } catch {
            throw new i.g(29);
          }
          return s && (e.node.timestamp = Date.now()), o;
        } }, Dn = { ra() {
          e: {
            if (!Pt.length) {
              var e = null;
              if (V) {
                var t = Buffer.alloc(256), n = 0, s = process.stdin.fd;
                try {
                  n = Lt.readSync(s, t);
                } catch (o) {
                  if (o.toString().includes("EOF")) n = 0;
                  else throw o;
                }
                0 < n ? e = t.slice(0, n).toString("utf-8") : e = null;
              } else typeof window < "u" && typeof window.prompt == "function" ? (e = window.prompt("Input: "), e !== null && (e += `
`)) : typeof readline == "function" && (e = readline(), e !== null && (e += `
`));
              if (!e) {
                e = null;
                break e;
              }
              Pt = dt(e, true);
            }
            e = Pt.shift();
          }
          return e;
        }, ia(e, t) {
          t === null || t === 10 ? (Ue(He(e.output, 0)), e.output = []) : t != 0 && e.output.push(t);
        }, fsync(e) {
          e.output && 0 < e.output.length && (Ue(He(e.output, 0)), e.output = []);
        }, Ia() {
          return { ab: 25856, cb: 5, $a: 191, bb: 35387, Za: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
        }, Ja() {
          return 0;
        }, Ka() {
          return [24, 80];
        } }, Nn = { ia(e, t) {
          t === null || t === 10 ? ($(He(e.output, 0)), e.output = []) : t != 0 && e.output.push(t);
        }, fsync(e) {
          e.output && 0 < e.output.length && ($(He(e.output, 0)), e.output = []);
        } }, Sr = () => {
          X("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
        };
        function Fr(e, t) {
          var n = e.m ? e.m.length : 0;
          n >= t || (t = Math.max(t, n * (1048576 > n ? 2 : 1.125) >>> 0), n != 0 && (t = Math.max(t, 256)), n = e.m, e.m = new Uint8Array(t), 0 < e.o && e.m.set(n.subarray(0, e.o), 0));
        }
        var B = { G: null, s() {
          return B.createNode(null, "/", 16895, 0);
        }, createNode(e, t, n, s) {
          if ((n & 61440) === 24576 || i.isFIFO(n)) throw new i.g(63);
          return B.G || (B.G = { dir: { node: { C: B.h.C, v: B.h.v, lookup: B.h.lookup, J: B.h.J, rename: B.h.rename, unlink: B.h.unlink, rmdir: B.h.rmdir, readdir: B.h.readdir, symlink: B.h.symlink }, stream: { D: B.l.D } }, file: { node: { C: B.h.C, v: B.h.v }, stream: { D: B.l.D, read: B.l.read, write: B.l.write, T: B.l.T, S: B.l.S, V: B.l.V } }, link: { node: { C: B.h.C, v: B.h.v, readlink: B.h.readlink }, stream: {} }, na: { node: { C: B.h.C, v: B.h.v }, stream: i.Da } }), n = i.createNode(e, t, n, s), se(n.mode) ? (n.h = B.G.dir.node, n.l = B.G.dir.stream, n.m = {}) : i.isFile(n.mode) ? (n.h = B.G.file.node, n.l = B.G.file.stream, n.o = 0, n.m = null) : (n.mode & 61440) === 40960 ? (n.h = B.G.link.node, n.l = B.G.link.stream) : (n.mode & 61440) === 8192 && (n.h = B.G.na.node, n.l = B.G.na.stream), n.timestamp = Date.now(), e && (e.m[t] = n, e.timestamp = n.timestamp), n;
        }, lb(e) {
          return e.m ? e.m.subarray ? e.m.subarray(0, e.o) : new Uint8Array(e.m) : new Uint8Array(0);
        }, h: { C(e) {
          var t = {};
          return t.dev = (e.mode & 61440) === 8192 ? e.id : 1, t.ino = e.id, t.mode = e.mode, t.nlink = 1, t.uid = 0, t.gid = 0, t.rdev = e.rdev, se(e.mode) ? t.size = 4096 : i.isFile(e.mode) ? t.size = e.o : (e.mode & 61440) === 40960 ? t.size = e.link.length : t.size = 0, t.atime = new Date(e.timestamp), t.mtime = new Date(e.timestamp), t.ctime = new Date(e.timestamp), t.Ba = 4096, t.blocks = Math.ceil(t.size / t.Ba), t;
        }, v(e, t) {
          if (t.mode !== void 0 && (e.mode = t.mode), t.timestamp !== void 0 && (e.timestamp = t.timestamp), t.size !== void 0 && (t = t.size, e.o != t)) if (t == 0) e.m = null, e.o = 0;
          else {
            var n = e.m;
            e.m = new Uint8Array(t), n && e.m.set(n.subarray(0, Math.min(t, e.o))), e.o = t;
          }
        }, lookup() {
          throw i.da[44];
        }, J(e, t, n, s) {
          return B.createNode(e, t, n, s);
        }, rename(e, t, n) {
          if (se(e.mode)) {
            try {
              var s = be(t, n);
            } catch {
            }
            if (s) for (var o in s.m) throw new i.g(55);
          }
          delete e.parent.m[e.name], e.parent.timestamp = Date.now(), e.name = n, t.m[n] = e, t.timestamp = e.parent.timestamp, e.parent = t;
        }, unlink(e, t) {
          delete e.m[t], e.timestamp = Date.now();
        }, rmdir(e, t) {
          var n = be(e, t), s;
          for (s in n.m) throw new i.g(55);
          delete e.m[t], e.timestamp = Date.now();
        }, readdir(e) {
          var t = [".", ".."], n;
          for (n in e.m) e.m.hasOwnProperty(n) && t.push(n);
          return t;
        }, symlink(e, t, n) {
          return e = B.createNode(e, t, 41471, 0), e.link = n, e;
        }, readlink(e) {
          if ((e.mode & 61440) !== 40960) throw new i.g(28);
          return e.link;
        } }, l: { read(e, t, n, s, o) {
          var d = e.node.m;
          if (o >= e.node.o) return 0;
          if (e = Math.min(e.node.o - o, s), v(0 <= e), 8 < e && d.subarray) t.set(d.subarray(o, o + e), n);
          else for (s = 0; s < e; s++) t[n + s] = d[o + s];
          return e;
        }, write(e, t, n, s, o, d) {
          if (v(!(t instanceof ArrayBuffer)), t.buffer === ee.buffer && (d = false), !s) return 0;
          if (e = e.node, e.timestamp = Date.now(), t.subarray && (!e.m || e.m.subarray)) {
            if (d) return v(o === 0, "canOwn must imply no weird position inside the file"), e.m = t.subarray(n, n + s), e.o = s;
            if (e.o === 0 && o === 0) return e.m = t.slice(n, n + s), e.o = s;
            if (o + s <= e.o) return e.m.set(t.subarray(n, n + s), o), s;
          }
          if (Fr(e, o + s), e.m.subarray && t.subarray) e.m.set(t.subarray(n, n + s), o);
          else for (d = 0; d < s; d++) e.m[o + d] = t[n + d];
          return e.o = Math.max(e.o, o + s), s;
        }, D(e, t, n) {
          if (n === 1 ? t += e.position : n === 2 && i.isFile(e.node.mode) && (t += e.node.o), 0 > t) throw new i.g(28);
          return t;
        }, T(e, t, n) {
          Fr(e.node, t + n), e.node.o = Math.max(e.node.o, t + n);
        }, S(e, t, n, s, o) {
          if (!i.isFile(e.node.mode)) throw new i.g(43);
          if (e = e.node.m, o & 2 || e.buffer !== ee.buffer) {
            if ((0 < n || n + t < e.length) && (e.subarray ? e = e.subarray(n, n + t) : e = Array.prototype.slice.call(e, n, n + t)), n = true, t = Sr(), !t) throw new i.g(48);
            ee.set(e, t);
          } else n = false, t = e.byteOffset;
          return { Ra: t, Aa: n };
        }, V(e, t, n, s) {
          return B.l.write(e, t, 0, s, n, false), 0;
        } } }, An = (e, t, n) => {
          var s = fr(`al ${e}`);
          Re(e, (o) => {
            v(o, `Loading data file "${e}" failed (no arrayBuffer).`), t(new Uint8Array(o)), s && ct(s);
          }, () => {
            if (n) n();
            else throw `Loading data file "${e}" failed.`;
          }), s && Nt(s);
        }, On = [], Pn = (e, t, n, s) => {
          typeof Browser < "u" && Browser.R();
          var o = false;
          return On.forEach((d) => {
            !o && d.canHandle(t) && (d.handle(e, t, n, s), o = true);
          }), o;
        }, xt = (e, t) => {
          var n = 0;
          return e && (n |= 365), t && (n |= 146), n;
        }, Rn = { 0: "Success", 1: "Arg list too long", 2: "Permission denied", 3: "Address already in use", 4: "Address not available", 5: "Address family not supported by protocol family", 6: "No more processes", 7: "Socket already connected", 8: "Bad file number", 9: "Trying to read unreadable message", 10: "Mount device busy", 11: "Operation canceled", 12: "No children", 13: "Connection aborted", 14: "Connection refused", 15: "Connection reset by peer", 16: "File locking deadlock error", 17: "Destination address required", 18: "Math arg out of domain of func", 19: "Quota exceeded", 20: "File exists", 21: "Bad address", 22: "File too large", 23: "Host is unreachable", 24: "Identifier removed", 25: "Illegal byte sequence", 26: "Connection already in progress", 27: "Interrupted system call", 28: "Invalid argument", 29: "I/O error", 30: "Socket is already connected", 31: "Is a directory", 32: "Too many symbolic links", 33: "Too many open files", 34: "Too many links", 35: "Message too long", 36: "Multihop attempted", 37: "File or path name too long", 38: "Network interface is not configured", 39: "Connection reset by network", 40: "Network is unreachable", 41: "Too many open files in system", 42: "No buffer space available", 43: "No such device", 44: "No such file or directory", 45: "Exec format error", 46: "No record locks available", 47: "The link has been severed", 48: "Not enough core", 49: "No message of desired type", 50: "Protocol not available", 51: "No space left on device", 52: "Function not implemented", 53: "Socket is not connected", 54: "Not a directory", 55: "Directory not empty", 56: "State not recoverable", 57: "Socket operation on non-socket", 59: "Not a typewriter", 60: "No such device or address", 61: "Value too large for defined data type", 62: "Previous owner died", 63: "Not super-user", 64: "Broken pipe", 65: "Protocol error", 66: "Unknown protocol", 67: "Protocol wrong type for socket", 68: "Math result not representable", 69: "Read only file system", 70: "Illegal seek", 71: "No such process", 72: "Stale file handle", 73: "Connection timed out", 74: "Text file busy", 75: "Cross-device link", 100: "Device not a stream", 101: "Bad font file fmt", 102: "Invalid slot", 103: "Invalid request code", 104: "No anode", 105: "Block device required", 106: "Channel number out of range", 107: "Level 3 halted", 108: "Level 3 reset", 109: "Link number out of range", 110: "Protocol driver not attached", 111: "No CSI structure available", 112: "Level 2 halted", 113: "Invalid exchange", 114: "Invalid request descriptor", 115: "Exchange full", 116: "No data (for no delay io)", 117: "Timer expired", 118: "Out of streams resources", 119: "Machine is not on the network", 120: "Package not installed", 121: "The object is remote", 122: "Advertise error", 123: "Srmount error", 124: "Communication error on send", 125: "Cross mount point (not really error)", 126: "Given log. name not unique", 127: "f.d. invalid for this operation", 128: "Remote address changed", 129: "Can   access a needed shared lib", 130: "Accessing a corrupted shared lib", 131: ".lib section in a.out corrupted", 132: "Attempting to link in too many libs", 133: "Attempting to exec a shared library", 135: "Streams pipe error", 136: "Too many users", 137: "Socket type not supported", 138: "Not supported", 139: "Protocol family not supported", 140: "Can't send after socket shutdown", 141: "Too many references", 142: "Host is down", 148: "No medium (in tape drive)", 156: "Level 2 not synchronized" }, Mr = { EPERM: 63, ENOENT: 44, ESRCH: 71, EINTR: 27, EIO: 29, ENXIO: 60, E2BIG: 1, ENOEXEC: 45, EBADF: 8, ECHILD: 12, EAGAIN: 6, EWOULDBLOCK: 6, ENOMEM: 48, EACCES: 2, EFAULT: 21, ENOTBLK: 105, EBUSY: 10, EEXIST: 20, EXDEV: 75, ENODEV: 43, ENOTDIR: 54, EISDIR: 31, EINVAL: 28, ENFILE: 41, EMFILE: 33, ENOTTY: 59, ETXTBSY: 74, EFBIG: 22, ENOSPC: 51, ESPIPE: 70, EROFS: 69, EMLINK: 34, EPIPE: 64, EDOM: 18, ERANGE: 68, ENOMSG: 49, EIDRM: 24, ECHRNG: 106, EL2NSYNC: 156, EL3HLT: 107, EL3RST: 108, ELNRNG: 109, EUNATCH: 110, ENOCSI: 111, EL2HLT: 112, EDEADLK: 16, ENOLCK: 46, EBADE: 113, EBADR: 114, EXFULL: 115, ENOANO: 104, EBADRQC: 103, EBADSLT: 102, EDEADLOCK: 16, EBFONT: 101, ENOSTR: 100, ENODATA: 116, ETIME: 117, ENOSR: 118, ENONET: 119, ENOPKG: 120, EREMOTE: 121, ENOLINK: 47, EADV: 122, ESRMNT: 123, ECOMM: 124, EPROTO: 65, EMULTIHOP: 36, EDOTDOT: 125, EBADMSG: 9, ENOTUNIQ: 126, EBADFD: 127, EREMCHG: 128, ELIBACC: 129, ELIBBAD: 130, ELIBSCN: 131, ELIBMAX: 132, ELIBEXEC: 133, ENOSYS: 52, ENOTEMPTY: 55, ENAMETOOLONG: 37, ELOOP: 32, EOPNOTSUPP: 138, EPFNOSUPPORT: 139, ECONNRESET: 15, ENOBUFS: 42, EAFNOSUPPORT: 5, EPROTOTYPE: 67, ENOTSOCK: 57, ENOPROTOOPT: 50, ESHUTDOWN: 140, ECONNREFUSED: 14, EADDRINUSE: 3, ECONNABORTED: 13, ENETUNREACH: 40, ENETDOWN: 38, ETIMEDOUT: 73, EHOSTDOWN: 142, EHOSTUNREACH: 23, EINPROGRESS: 26, EALREADY: 7, EDESTADDRREQ: 17, EMSGSIZE: 35, EPROTONOSUPPORT: 66, ESOCKTNOSUPPORT: 137, EADDRNOTAVAIL: 4, ENETRESET: 39, EISCONN: 30, ENOTCONN: 53, ETOOMANYREFS: 141, EUSERS: 136, EDQUOT: 19, ESTALE: 72, ENOTSUP: 138, ENOMEDIUM: 148, EILSEQ: 25, EOVERFLOW: 61, ECANCELED: 11, ENOTRECOVERABLE: 56, EOWNERDEAD: 62, ESTRPIPE: 135 }, In = (e) => e.replace(/\b_Z[\w\d_]+/g, function(t) {
          return je("warning: build with -sDEMANGLE_SUPPORT to link in libcxxabi demangling"), t === t ? t : t + " [" + t + "]";
        });
        function Ut(e, t) {
          i.pa[e] = { l: t };
        }
        function se(e) {
          return (e & 61440) === 16384;
        }
        function be(e, t) {
          var n;
          if (n = (n = Ce(e, "x")) ? n : e.h.lookup ? 0 : 2) throw new i.g(n, e);
          for (n = i.F[Bt(e.id, t)]; n; n = n.N) {
            var s = n.name;
            if (n.parent.id === e.id && s === t) return n;
          }
          return i.lookup(e, t);
        }
        function Z(e, t = {}) {
          if (e = Fe(e), !e) return { path: "", node: null };
          if (t = Object.assign({ ba: true, ka: 0 }, t), 8 < t.ka) throw new i.g(32);
          e = e.split("/").filter((_) => !!_);
          for (var n = i.root, s = "/", o = 0; o < e.length; o++) {
            var d = o === e.length - 1;
            if (d && t.parent) break;
            if (n = be(n, e[o]), s = ge(s + "/" + e[o]), n.A && (!d || d && t.ba) && (n = n.A.root), !d || t.B) {
              for (d = 0; (n.mode & 61440) === 40960; ) if (n = i.readlink(s), s = Fe(Ot(s), n), n = Z(s, { ka: t.ka + 1 }).node, 40 < d++) throw new i.g(32);
            }
          }
          return { path: s, node: n };
        }
        function Me(e) {
          for (var t; ; ) {
            if (i.Z(e)) return e = e.s.ua, t ? e[e.length - 1] !== "/" ? `${e}/${t}` : e + t : e;
            t = t ? `${e.name}/${t}` : e.name, e = e.parent;
          }
        }
        function Bt(e, t) {
          for (var n = 0, s = 0; s < t.length; s++) n = (n << 5) - n + t.charCodeAt(s) | 0;
          return (e + n >>> 0) % i.F.length;
        }
        function Cr(e) {
          var t = Bt(e.parent.id, e.name);
          e.N = i.F[t], i.F[t] = e;
        }
        function ft(e) {
          var t = Bt(e.parent.id, e.name);
          if (i.F[t] === e) i.F[t] = e.N;
          else for (t = i.F[t]; t; ) {
            if (t.N === e) {
              t.N = e.N;
              break;
            }
            t = t.N;
          }
        }
        function Dr(e) {
          var t = ["r", "w", "rw"][e & 3];
          return e & 512 && (t += "w"), t;
        }
        function Ce(e, t) {
          if (i.ta) return 0;
          if (!t.includes("r") || e.mode & 292) {
            if (t.includes("w") && !(e.mode & 146) || t.includes("x") && !(e.mode & 73)) return 2;
          } else return 2;
          return 0;
        }
        function Vt(e, t) {
          try {
            return be(e, t), 20;
          } catch {
          }
          return Ce(e, "wx");
        }
        function ht(e, t, n) {
          try {
            var s = be(e, t);
          } catch (o) {
            return o.u;
          }
          if (e = Ce(e, "wx")) return e;
          if (n) {
            if (!se(s.mode)) return 54;
            if (i.Z(s) || Me(s) === i.cwd()) return 10;
          } else if (se(s.mode)) return 31;
          return 0;
        }
        function xn() {
          for (var e = 0; e <= i.xa; e++) if (!i.streams[e]) return e;
          throw new i.g(33);
        }
        function ue(e) {
          if (e = i.qa(e), !e) throw new i.g(8);
          return e;
        }
        function jt(e, t = -1) {
          return i.X || (i.X = function() {
            this.I = {};
          }, i.X.prototype = {}, Object.defineProperties(i.X.prototype, { object: { get() {
            return this.node;
          }, set(n) {
            this.node = n;
          } }, flags: { get() {
            return this.I.flags;
          }, set(n) {
            this.I.flags = n;
          } }, position: { get() {
            return this.I.position;
          }, set(n) {
            this.I.position = n;
          } } })), e = Object.assign(new i.X(), e), t == -1 && (t = xn()), e.fd = t, i.streams[t] = e;
        }
        function Nr(e) {
          var t = [];
          for (e = [e]; e.length; ) {
            var n = e.pop();
            t.push(n), e.push.apply(e, n.U);
          }
          return t;
        }
        function mt(e, t, n) {
          return typeof n > "u" && (n = t, t = 438), i.J(e, t | 8192, n);
        }
        function Ar() {
          i.g || (i.g = function(e, t) {
            this.name = "ErrnoError", this.node = t, this.Sa = function(n) {
              this.u = n;
              for (var s in Mr) if (Mr[s] === n) {
                this.code = s;
                break;
              }
            }, this.Sa(e), this.message = Rn[e], this.stack && (Object.defineProperty(this, "stack", { value: Error().stack, writable: true }), this.stack = In(this.stack));
          }, i.g.prototype = Error(), i.g.prototype.constructor = i.g, [44].forEach((e) => {
            i.da[e] = new i.g(e), i.da[e].stack = "<generic error, no stack>";
          }));
        }
        function Or(e, t) {
          try {
            var n = Z(e, { B: !t });
            e = n.path;
          } catch {
          }
          var s = { Z: false, exists: false, error: 0, name: null, path: null, object: null, Oa: false, Qa: null, Pa: null };
          try {
            n = Z(e, { parent: true }), s.Oa = true, s.Qa = n.path, s.Pa = n.node, s.name = Se(e), n = Z(e, { B: !t }), s.exists = true, s.path = n.path, s.object = n.node, s.name = n.node.name, s.Z = n.path === "/";
          } catch (o) {
            s.error = o.u;
          }
          return s;
        }
        function Un(e, t, n, s) {
          return e = typeof e == "string" ? e : Me(e), t = ge(e + "/" + t), i.create(t, xt(n, s));
        }
        function Ht(e) {
          if (!(e.La || e.Ma || e.link || e.m)) {
            if (typeof XMLHttpRequest < "u") throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
            if (Pe) try {
              e.m = dt(Pe(e.url), true), e.o = e.m.length;
            } catch {
              throw new i.g(29);
            }
            else throw Error("Cannot load without read() or XMLHttpRequest.");
          }
        }
        var i = { root: null, U: [], pa: {}, streams: [], Na: 1, F: null, oa: "/", Y: false, ta: true, g: null, da: {}, Fa: null, W: 0, createNode(e, t, n, s) {
          return v(typeof e == "object"), e = new i.wa(e, t, n, s), Cr(e), e;
        }, Z(e) {
          return e === e.parent;
        }, isFile(e) {
          return (e & 61440) === 32768;
        }, isFIFO(e) {
          return (e & 61440) === 4096;
        }, isSocket(e) {
          return (e & 49152) === 49152;
        }, xa: 4096, qa: (e) => i.streams[e], Da: { open(e) {
          e.l = i.Ga(e.node.rdev).l, e.l.open && e.l.open(e);
        }, D() {
          throw new i.g(70);
        } }, ha: (e) => e >> 8, nb: (e) => e & 255, M: (e, t) => e << 8 | t, Ga: (e) => i.pa[e], va(e, t) {
          function n(_) {
            return v(0 < i.W), i.W--, t(_);
          }
          function s(_) {
            if (_) {
              if (!s.Ea) return s.Ea = true, n(_);
            } else ++d >= o.length && n(null);
          }
          typeof e == "function" && (t = e, e = false), i.W++, 1 < i.W && $(`warning: ${i.W} FS.syncfs operations in flight at once, probably just doing extra work`);
          var o = Nr(i.root.s), d = 0;
          o.forEach((_) => {
            if (!_.type.va) return s(null);
            _.type.va(_, e, s);
          });
        }, s(e, t, n) {
          if (typeof e == "string") throw e;
          var s = n === "/", o = !n;
          if (s && i.root) throw new i.g(10);
          if (!s && !o) {
            var d = Z(n, { ba: false });
            if (n = d.path, d = d.node, d.A) throw new i.g(10);
            if (!se(d.mode)) throw new i.g(54);
          }
          return t = { type: e, rb: t, ua: n, U: [] }, e = e.s(t), e.s = t, t.root = e, s ? i.root = e : d && (d.A = t, d.s && d.s.U.push(t)), e;
        }, xb(e) {
          if (e = Z(e, { ba: false }), !e.node.A) throw new i.g(28);
          e = e.node;
          var t = e.A, n = Nr(t);
          Object.keys(i.F).forEach((s) => {
            for (s = i.F[s]; s; ) {
              var o = s.N;
              n.includes(s.s) && ft(s), s = o;
            }
          }), e.A = null, t = e.s.U.indexOf(t), v(t !== -1), e.s.U.splice(t, 1);
        }, lookup(e, t) {
          return e.h.lookup(e, t);
        }, J(e, t, n) {
          var s = Z(e, { parent: true }).node;
          if (e = Se(e), !e || e === "." || e === "..") throw new i.g(28);
          var o = Vt(s, e);
          if (o) throw new i.g(o);
          if (!s.h.J) throw new i.g(63);
          return s.h.J(s, e, t, n);
        }, create(e, t) {
          return i.J(e, (t !== void 0 ? t : 438) & 4095 | 32768, 0);
        }, mkdir(e, t) {
          return i.J(e, (t !== void 0 ? t : 511) & 1023 | 16384, 0);
        }, ob(e, t) {
          e = e.split("/");
          for (var n = "", s = 0; s < e.length; ++s) if (e[s]) {
            n += "/" + e[s];
            try {
              i.mkdir(n, t);
            } catch (o) {
              if (o.u != 20) throw o;
            }
          }
        }, symlink(e, t) {
          if (!Fe(e)) throw new i.g(44);
          var n = Z(t, { parent: true }).node;
          if (!n) throw new i.g(44);
          t = Se(t);
          var s = Vt(n, t);
          if (s) throw new i.g(s);
          if (!n.h.symlink) throw new i.g(63);
          return n.h.symlink(n, t, e);
        }, rename(e, t) {
          var n = Ot(e), s = Ot(t), o = Se(e), d = Se(t), _ = Z(e, { parent: true }), L = _.node;
          if (_ = Z(t, { parent: true }), _ = _.node, !L || !_) throw new i.g(44);
          if (L.s !== _.s) throw new i.g(75);
          var I = be(L, o);
          if (e = Lr(e, s), e.charAt(0) !== ".") throw new i.g(28);
          if (e = Lr(t, n), e.charAt(0) !== ".") throw new i.g(55);
          try {
            var T = be(_, d);
          } catch {
          }
          if (I !== T) {
            if (t = se(I.mode), o = ht(L, o, t)) throw new i.g(o);
            if (o = T ? ht(_, d, t) : Vt(_, d)) throw new i.g(o);
            if (!L.h.rename) throw new i.g(63);
            if (I.A || T && T.A) throw new i.g(10);
            if (_ !== L && (o = Ce(L, "w"))) throw new i.g(o);
            ft(I);
            try {
              L.h.rename(I, _, d);
            } catch (R) {
              throw R;
            } finally {
              Cr(I);
            }
          }
        }, rmdir(e) {
          var t = Z(e, { parent: true }).node;
          e = Se(e);
          var n = be(t, e), s = ht(t, e, true);
          if (s) throw new i.g(s);
          if (!t.h.rmdir) throw new i.g(63);
          if (n.A) throw new i.g(10);
          t.h.rmdir(t, e), ft(n);
        }, readdir(e) {
          if (e = Z(e, { B: true }).node, !e.h.readdir) throw new i.g(54);
          return e.h.readdir(e);
        }, unlink(e) {
          var t = Z(e, { parent: true }).node;
          if (!t) throw new i.g(44);
          e = Se(e);
          var n = be(t, e), s = ht(t, e, false);
          if (s) throw new i.g(s);
          if (!t.h.unlink) throw new i.g(63);
          if (n.A) throw new i.g(10);
          t.h.unlink(t, e), ft(n);
        }, readlink(e) {
          if (e = Z(e).node, !e) throw new i.g(44);
          if (!e.h.readlink) throw new i.g(28);
          return Fe(Me(e.parent), e.h.readlink(e));
        }, stat(e, t) {
          if (e = Z(e, { B: !t }).node, !e) throw new i.g(44);
          if (!e.h.C) throw new i.g(63);
          return e.h.C(e);
        }, lstat(e) {
          return i.stat(e, true);
        }, chmod(e, t, n) {
          if (e = typeof e == "string" ? Z(e, { B: !n }).node : e, !e.h.v) throw new i.g(63);
          e.h.v(e, { mode: t & 4095 | e.mode & -4096, timestamp: Date.now() });
        }, lchmod(e, t) {
          i.chmod(e, t, true);
        }, fchmod(e, t) {
          e = ue(e), i.chmod(e.node, t);
        }, chown(e, t, n, s) {
          if (e = typeof e == "string" ? Z(e, { B: !s }).node : e, !e.h.v) throw new i.g(63);
          e.h.v(e, { timestamp: Date.now() });
        }, lchown(e, t, n) {
          i.chown(e, t, n, true);
        }, fchown(e, t, n) {
          e = ue(e), i.chown(e.node, t, n);
        }, truncate(e, t) {
          if (0 > t) throw new i.g(28);
          if (e = typeof e == "string" ? Z(e, { B: true }).node : e, !e.h.v) throw new i.g(63);
          if (se(e.mode)) throw new i.g(31);
          if (!i.isFile(e.mode)) throw new i.g(28);
          var n = Ce(e, "w");
          if (n) throw new i.g(n);
          e.h.v(e, { size: t, timestamp: Date.now() });
        }, kb(e, t) {
          if (e = ue(e), !(e.flags & 2097155)) throw new i.g(28);
          i.truncate(e.node, t);
        }, yb(e, t, n) {
          e = Z(e, { B: true }).node, e.h.v(e, { timestamp: Math.max(t, n) });
        }, open(e, t, n) {
          if (e === "") throw new i.g(44);
          if (typeof t == "string") {
            var s = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[t];
            if (typeof s > "u") throw Error(`Unknown file open mode: ${t}`);
            t = s;
          }
          if (n = t & 64 ? (typeof n > "u" ? 438 : n) & 4095 | 32768 : 0, typeof e == "object") var o = e;
          else {
            e = ge(e);
            try {
              o = Z(e, { B: !(t & 131072) }).node;
            } catch {
            }
          }
          if (s = false, t & 64) if (o) {
            if (t & 128) throw new i.g(20);
          } else o = i.J(e, n, 0), s = true;
          if (!o) throw new i.g(44);
          if ((o.mode & 61440) === 8192 && (t &= -513), t & 65536 && !se(o.mode)) throw new i.g(54);
          if (!s && (n = o ? (o.mode & 61440) === 40960 ? 32 : se(o.mode) && (Dr(t) !== "r" || t & 512) ? 31 : Ce(o, Dr(t)) : 44)) throw new i.g(n);
          return t & 512 && !s && i.truncate(o, 0), t &= -131713, o = jt({ node: o, path: Me(o), flags: t, seekable: true, position: 0, l: o.l, Xa: [], error: false }), o.l.open && o.l.open(o), !a.logReadFiles || t & 1 || (i.ja || (i.ja = {}), e in i.ja || (i.ja[e] = 1)), o;
        }, close(e) {
          if (e.fd === null) throw new i.g(8);
          e.ea && (e.ea = null);
          try {
            e.l.close && e.l.close(e);
          } catch (t) {
            throw t;
          } finally {
            i.streams[e.fd] = null;
          }
          e.fd = null;
        }, D(e, t, n) {
          if (e.fd === null) throw new i.g(8);
          if (!e.seekable || !e.l.D) throw new i.g(70);
          if (n != 0 && n != 1 && n != 2) throw new i.g(28);
          return e.position = e.l.D(e, t, n), e.Xa = [], e.position;
        }, read(e, t, n, s, o) {
          if (v(0 <= n), 0 > s || 0 > o) throw new i.g(28);
          if (e.fd === null) throw new i.g(8);
          if ((e.flags & 2097155) === 1) throw new i.g(8);
          if (se(e.node.mode)) throw new i.g(31);
          if (!e.l.read) throw new i.g(28);
          var d = typeof o < "u";
          if (!d) o = e.position;
          else if (!e.seekable) throw new i.g(70);
          return t = e.l.read(e, t, n, s, o), d || (e.position += t), t;
        }, write(e, t, n, s, o, d) {
          if (v(0 <= n), 0 > s || 0 > o) throw new i.g(28);
          if (e.fd === null) throw new i.g(8);
          if (!(e.flags & 2097155)) throw new i.g(8);
          if (se(e.node.mode)) throw new i.g(31);
          if (!e.l.write) throw new i.g(28);
          e.seekable && e.flags & 1024 && i.D(e, 0, 2);
          var _ = typeof o < "u";
          if (!_) o = e.position;
          else if (!e.seekable) throw new i.g(70);
          return t = e.l.write(e, t, n, s, o, d), _ || (e.position += t), t;
        }, T(e, t, n) {
          if (e.fd === null) throw new i.g(8);
          if (0 > t || 0 >= n) throw new i.g(28);
          if (!(e.flags & 2097155)) throw new i.g(8);
          if (!i.isFile(e.node.mode) && !se(e.node.mode)) throw new i.g(43);
          if (!e.l.T) throw new i.g(138);
          e.l.T(e, t, n);
        }, S(e, t, n, s, o) {
          if (s & 2 && !(o & 2) && (e.flags & 2097155) !== 2) throw new i.g(2);
          if ((e.flags & 2097155) === 1) throw new i.g(2);
          if (!e.l.S) throw new i.g(43);
          return e.l.S(e, t, n, s, o);
        }, V(e, t, n, s, o) {
          return v(0 <= n), e.l.V ? e.l.V(e, t, n, s, o) : 0;
        }, qb: () => 0, fa(e, t, n) {
          if (!e.l.fa) throw new i.g(59);
          return e.l.fa(e, t, n);
        }, readFile(e, t = {}) {
          if (t.flags = t.flags || 0, t.encoding = t.encoding || "binary", t.encoding !== "utf8" && t.encoding !== "binary") throw Error(`Invalid encoding type "${t.encoding}"`);
          var n, s = i.open(e, t.flags);
          e = i.stat(e).size;
          var o = new Uint8Array(e);
          return i.read(s, o, 0, e, 0), t.encoding === "utf8" ? n = He(o, 0) : t.encoding === "binary" && (n = o), i.close(s), n;
        }, writeFile(e, t, n = {}) {
          if (n.flags = n.flags || 577, e = i.open(e, n.flags, n.mode), typeof t == "string") {
            var s = new Uint8Array(Ye(t) + 1);
            t = Rt(t, s, 0, s.length), i.write(e, s, 0, t, void 0, n.Ca);
          } else if (ArrayBuffer.isView(t)) i.write(e, t, 0, t.byteLength, void 0, n.Ca);
          else throw Error("Unsupported data type");
          i.close(e);
        }, cwd: () => i.oa, chdir(e) {
          if (e = Z(e, { B: true }), e.node === null) throw new i.g(44);
          if (!se(e.node.mode)) throw new i.g(54);
          var t = Ce(e.node, "x");
          if (t) throw new i.g(t);
          i.oa = e.path;
        }, R(e, t, n) {
          v(!i.R.Y, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"), i.R.Y = true, Ar(), a.stdin = e || a.stdin, a.stdout = t || a.stdout, a.stderr = n || a.stderr, a.stdin ? i.L("/dev", "stdin", a.stdin) : i.symlink("/dev/tty", "/dev/stdin"), a.stdout ? i.L("/dev", "stdout", null, a.stdout) : i.symlink("/dev/tty", "/dev/stdout"), a.stderr ? i.L("/dev", "stderr", null, a.stderr) : i.symlink("/dev/tty1", "/dev/stderr"), e = i.open("/dev/stdin", 0), t = i.open("/dev/stdout", 1), n = i.open("/dev/stderr", 1), v(e.fd === 0, `invalid handle for stdin (${e.fd})`), v(t.fd === 1, `invalid handle for stdout (${t.fd})`), v(n.fd === 2, `invalid handle for stderr (${n.fd})`);
        }, sb() {
          i.R.Y = false, Hr(0);
          for (var e = 0; e < i.streams.length; e++) {
            var t = i.streams[e];
            t && i.close(t);
          }
        }, jb(e, t) {
          return e = Or(e, t), e.exists ? e.object : null;
        }, hb(e, t) {
          for (e = typeof e == "string" ? e : Me(e), t = t.split("/").reverse(); t.length; ) {
            var n = t.pop();
            if (n) {
              var s = ge(e + "/" + n);
              try {
                i.mkdir(s);
              } catch {
              }
              e = s;
            }
          }
          return s;
        }, L(e, t, n, s) {
          e = Fn(typeof e == "string" ? e : Me(e), t), t = xt(!!n, !!s), i.L.ha || (i.L.ha = 64);
          var o = i.M(i.L.ha++, 0);
          return Ut(o, { open(d) {
            d.seekable = false;
          }, close() {
            s && s.buffer && s.buffer.length && s(10);
          }, read(d, _, L, I) {
            for (var T = 0, R = 0; R < I; R++) {
              try {
                var F = n();
              } catch {
                throw new i.g(29);
              }
              if (F === void 0 && T === 0) throw new i.g(6);
              if (F == null) break;
              T++, _[L + R] = F;
            }
            return T && (d.node.timestamp = Date.now()), T;
          }, write(d, _, L, I) {
            for (var T = 0; T < I; T++) try {
              s(_[L + T]);
            } catch {
              throw new i.g(29);
            }
            return I && (d.node.timestamp = Date.now()), T;
          } }), mt(e, t, o);
        }, fb(e, t, n, s, o) {
          function d() {
            this.ga = false, this.I = [];
          }
          function _(F, G, m, N, D) {
            if (F = F.node.m, D >= F.length) return 0;
            if (N = Math.min(F.length - D, N), v(0 <= N), F.slice) for (var H = 0; H < N; H++) G[m + H] = F[D + H];
            else for (H = 0; H < N; H++) G[m + H] = F.get(D + H);
            return N;
          }
          if (d.prototype.get = function(F) {
            if (!(F > this.length - 1 || 0 > F)) {
              var G = F % this.chunkSize;
              return this.sa(F / this.chunkSize | 0)[G];
            }
          }, d.prototype.Ha = function(F) {
            this.sa = F;
          }, d.prototype.ma = function() {
            var F = new XMLHttpRequest();
            if (F.open("HEAD", n, false), F.send(null), !(200 <= F.status && 300 > F.status || F.status === 304)) throw Error("Couldn't load " + n + ". Status: " + F.status);
            var G = Number(F.getResponseHeader("Content-length")), m, N = (m = F.getResponseHeader("Accept-Ranges")) && m === "bytes";
            F = (m = F.getResponseHeader("Content-Encoding")) && m === "gzip";
            var D = 1048576;
            N || (D = G);
            var H = this;
            H.Ha((ne) => {
              var fe = ne * D, he = (ne + 1) * D - 1;
              if (he = Math.min(he, G - 1), typeof H.I[ne] > "u") {
                var Jt = H.I;
                if (fe > he) throw Error("invalid range (" + fe + ", " + he + ") or no bytes requested!");
                if (he > G - 1) throw Error("only " + G + " bytes available! programmer error!");
                var le = new XMLHttpRequest();
                if (le.open("GET", n, false), G !== D && le.setRequestHeader("Range", "bytes=" + fe + "-" + he), le.responseType = "arraybuffer", le.overrideMimeType && le.overrideMimeType("text/plain; charset=x-user-defined"), le.send(null), !(200 <= le.status && 300 > le.status || le.status === 304)) throw Error("Couldn't load " + n + ". Status: " + le.status);
                fe = le.response !== void 0 ? new Uint8Array(le.response || []) : dt(le.responseText || "", true), Jt[ne] = fe;
              }
              if (typeof H.I[ne] > "u") throw Error("doXHR failed!");
              return H.I[ne];
            }), (F || !G) && (D = G = 1, D = G = this.sa(0).length, Ue("LazyFiles on gzip forces download of the whole file when length is accessed")), this.za = G, this.ya = D, this.ga = true;
          }, typeof XMLHttpRequest < "u") {
            if (!j) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var L = new d();
            Object.defineProperties(L, { length: { get: function() {
              return this.ga || this.ma(), this.za;
            } }, chunkSize: { get: function() {
              return this.ga || this.ma(), this.ya;
            } } });
            var I = void 0;
          } else I = n, L = void 0;
          var T = Un(e, t, s, o);
          L ? T.m = L : I && (T.m = null, T.url = I), Object.defineProperties(T, { o: { get: function() {
            return this.m.length;
          } } });
          var R = {};
          return Object.keys(T.l).forEach((F) => {
            var G = T.l[F];
            R[F] = function() {
              return Ht(T), G.apply(null, arguments);
            };
          }), R.read = (F, G, m, N, D) => (Ht(T), _(F, G, m, N, D)), R.S = (F, G, m) => {
            Ht(T);
            var N = Sr();
            if (!N) throw new i.g(48);
            return _(F, ee, N, G, m), { Ra: N, Aa: true };
          }, T.l = R, T;
        }, Ya() {
          X("FS.absolutePath has been removed; use PATH_FS.resolve instead");
        }, eb() {
          X("FS.createFolder has been removed; use FS.mkdir instead");
        }, gb() {
          X("FS.createLink has been removed; use FS.symlink instead");
        }, mb() {
          X("FS.joinPath has been removed; use PATH.join instead");
        }, pb() {
          X("FS.mmapAlloc has been replaced by the top level function mmapAlloc");
        }, vb() {
          X("FS.standardizePath has been removed; use PATH.normalize instead");
        } }, me = (e) => (v(typeof e == "number", `UTF8ToString expects a number (got ${typeof e})`), e ? He(lt, e) : "");
        function tt(e, t) {
          if (t.charAt(0) === "/") return t;
          if (e = e === -100 ? i.cwd() : ue(e).path, t.length == 0) throw new i.g(44);
          return ge(e + "/" + t);
        }
        var ze = void 0;
        function we() {
          v(ze != null);
          var e = S[+ze >> 2];
          return ze += 4, e;
        }
        var pt = (e, t, n) => (v(typeof n == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), Rt(e, lt, t, n)), We = (e) => e % 4 === 0 && (e % 100 !== 0 || e % 400 === 0), Pr = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Rr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Yt = (e) => {
          var t = Ye(e) + 1, n = Vn(t);
          return n && pt(e, n, t), n;
        }, _t = {}, Ir = () => {
          if (!zt) {
            var e = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: k || "./this.program" }, t;
            for (t in _t) _t[t] === void 0 ? delete e[t] : e[t] = _t[t];
            var n = [];
            for (t in e) n.push(`${t}=${e[t]}`);
            zt = n;
          }
          return zt;
        }, zt, xr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Ur = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Br = (e, t) => {
          v(0 <= e.length, "writeArrayToMemory array must have a length (should be an array or typed array)"), ee.set(e, t);
        }, De = [], oe, Wt = (e) => {
          var t = De[e];
          return t || (e >= De.length && (De.length = e + 1), De[e] = t = oe.get(e)), v(oe.get(e) == t, "JavaScript-side Wasm function table mirror is out of date!"), t;
        }, Bn = (e) => {
          var t = a["_" + e];
          return v(t, "Cannot call unknown function " + e + ", make sure it is exported"), t;
        }, Ne, Gt = [];
        function Vr(e, t, n, s) {
          e ||= this, this.parent = e, this.s = e.s, this.A = null, this.id = i.Na++, this.name = t, this.mode = n, this.h = {}, this.l = {}, this.rdev = s;
        }
        Object.defineProperties(Vr.prototype, { read: { get: function() {
          return (this.mode & 365) === 365;
        }, set: function(e) {
          e ? this.mode |= 365 : this.mode &= -366;
        } }, write: { get: function() {
          return (this.mode & 146) === 146;
        }, set: function(e) {
          e ? this.mode |= 146 : this.mode &= -147;
        } }, Ma: { get: function() {
          return se(this.mode);
        } }, La: { get: function() {
          return (this.mode & 61440) === 8192;
        } } }), i.wa = Vr, i.ib = (e, t, n, s, o, d, _, L, I, T) => {
          function R(m) {
            function N(D) {
              if (T && T(), !L) {
                var H = e, ne = t;
                if (H && (H = typeof H == "string" ? H : Me(H), ne = t ? ge(H + "/" + t) : H), H = xt(s, o), ne = i.create(ne, H), D) {
                  if (typeof D == "string") {
                    for (var fe = Array(D.length), he = 0, Jt = D.length; he < Jt; ++he) fe[he] = D.charCodeAt(he);
                    D = fe;
                  }
                  i.chmod(ne, H | 146), fe = i.open(ne, 577), i.write(fe, D, 0, D.length, 0, I), i.close(fe), i.chmod(ne, H);
                }
              }
              d && d(), ct(G);
            }
            Pn(m, F, N, () => {
              _ && _(), ct(G);
            }) || N(m);
          }
          var F = t ? Fe(ge(e + "/" + t)) : e, G = fr(`cp ${F}`);
          Nt(G), typeof n == "string" ? An(n, (m) => R(m), _) : R(n);
        }, Ar(), i.F = Array(4096), i.s(B, {}, "/"), i.mkdir("/tmp"), i.mkdir("/home"), i.mkdir("/home/web_user"), function() {
          i.mkdir("/dev"), Ut(i.M(1, 3), { read: () => 0, write: (s, o, d, _) => _ }), mt("/dev/null", i.M(1, 3)), kr(i.M(5, 0), Dn), kr(i.M(6, 0), Nn), mt("/dev/tty", i.M(5, 0)), mt("/dev/tty1", i.M(6, 0));
          var e = new Uint8Array(1024), t = 0, n = () => (t === 0 && (t = Er(e).byteLength), e[--t]);
          i.L("/dev", "random", n), i.L("/dev", "urandom", n), i.mkdir("/dev/shm"), i.mkdir("/dev/shm/tmp");
        }(), function() {
          i.mkdir("/proc");
          var e = i.mkdir("/proc/self");
          i.mkdir("/proc/self/fd"), i.s({ s() {
            var t = i.createNode(e, "fd", 16895, 73);
            return t.h = { lookup(n, s) {
              var o = ue(+s);
              return n = { parent: null, s: { ua: "fake" }, h: { readlink: () => o.path } }, n.parent = n;
            } }, t;
          } }, {}, "/proc/self/fd");
        }(), i.Fa = { MEMFS: B };
        var jr = { __syscall_dup3: function(e, t, n) {
          try {
            var s = ue(e);
            if (v(!n), s.fd === t) return -28;
            var o = i.qa(t);
            return o && i.close(o), jt(s, t).fd;
          } catch (d) {
            if (typeof i > "u" || d.name !== "ErrnoError") throw d;
            return -d.u;
          }
        }, __syscall_fcntl64: function(e, t, n) {
          ze = n;
          try {
            var s = ue(e);
            switch (t) {
              case 0:
                var o = we();
                if (0 > o) return -28;
                for (; i.streams[o]; ) o++;
                return jt(s, o).fd;
              case 1:
              case 2:
                return 0;
              case 3:
                return s.flags;
              case 4:
                return o = we(), s.flags |= o, 0;
              case 5:
                return o = we(), Be[o + 0 >> 1] = 2, 0;
              case 6:
              case 7:
                return 0;
              case 16:
              case 8:
                return -28;
              case 9:
                return S[qt() >> 2] = 28, -1;
              default:
                return -28;
            }
          } catch (d) {
            if (typeof i > "u" || d.name !== "ErrnoError") throw d;
            return -d.u;
          }
        }, __syscall_ioctl: function(e, t, n) {
          ze = n;
          try {
            var s = ue(e);
            switch (t) {
              case 21509:
                return s.tty ? 0 : -59;
              case 21505:
                if (!s.tty) return -59;
                if (s.tty.K.Ia) {
                  e = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                  var o = we();
                  S[o >> 2] = 25856, S[o + 4 >> 2] = 5, S[o + 8 >> 2] = 191, S[o + 12 >> 2] = 35387;
                  for (var d = 0; 32 > d; d++) ee[o + d + 17 >> 0] = e[d] || 0;
                }
                return 0;
              case 21510:
              case 21511:
              case 21512:
                return s.tty ? 0 : -59;
              case 21506:
              case 21507:
              case 21508:
                if (!s.tty) return -59;
                if (s.tty.K.Ja) for (o = we(), e = [], d = 0; 32 > d; d++) e.push(ee[o + d + 17 >> 0]);
                return 0;
              case 21519:
                return s.tty ? (o = we(), S[o >> 2] = 0) : -59;
              case 21520:
                return s.tty ? -28 : -59;
              case 21531:
                return o = we(), i.fa(s, t, o);
              case 21523:
                return s.tty ? (s.tty.K.Ka && (d = [24, 80], o = we(), Be[o >> 1] = d[0], Be[o + 2 >> 1] = d[1]), 0) : -59;
              case 21524:
                return s.tty ? 0 : -59;
              case 21515:
                return s.tty ? 0 : -59;
              default:
                return -28;
            }
          } catch (_) {
            if (typeof i > "u" || _.name !== "ErrnoError") throw _;
            return -_.u;
          }
        }, __syscall_openat: function(e, t, n, s) {
          ze = s;
          try {
            t = me(t), t = tt(e, t);
            var o = s ? we() : 0;
            return i.open(t, n, o).fd;
          } catch (d) {
            if (typeof i > "u" || d.name !== "ErrnoError") throw d;
            return -d.u;
          }
        }, __syscall_readlinkat: function(e, t, n, s) {
          try {
            if (t = me(t), t = tt(e, t), 0 >= s) return -28;
            var o = i.readlink(t), d = Math.min(s, Ye(o)), _ = ee[n + d];
            return pt(o, n, s + 1), ee[n + d] = _, d;
          } catch (L) {
            if (typeof i > "u" || L.name !== "ErrnoError") throw L;
            return -L.u;
          }
        }, __syscall_renameat: function(e, t, n, s) {
          try {
            return t = me(t), s = me(s), t = tt(e, t), s = tt(n, s), i.rename(t, s), 0;
          } catch (o) {
            if (typeof i > "u" || o.name !== "ErrnoError") throw o;
            return -o.u;
          }
        }, __syscall_rmdir: function(e) {
          try {
            return e = me(e), i.rmdir(e), 0;
          } catch (t) {
            if (typeof i > "u" || t.name !== "ErrnoError") throw t;
            return -t.u;
          }
        }, __syscall_unlinkat: function(e, t, n) {
          try {
            return t = me(t), t = tt(e, t), n === 0 ? i.unlink(t) : n === 512 ? i.rmdir(t) : X("Invalid flags passed to unlinkat"), 0;
          } catch (s) {
            if (typeof i > "u" || s.name !== "ErrnoError") throw s;
            return -s.u;
          }
        }, _emscripten_get_now_is_monotonic: () => 1, _emscripten_throw_longjmp: () => {
          throw 1 / 0;
        }, _gmtime_js: function(e, t) {
          e = -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e), e = new Date(1e3 * e), S[t >> 2] = e.getUTCSeconds(), S[t + 4 >> 2] = e.getUTCMinutes(), S[t + 8 >> 2] = e.getUTCHours(), S[t + 12 >> 2] = e.getUTCDate(), S[t + 16 >> 2] = e.getUTCMonth(), S[t + 20 >> 2] = e.getUTCFullYear() - 1900, S[t + 24 >> 2] = e.getUTCDay(), S[t + 28 >> 2] = (e.getTime() - Date.UTC(e.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0;
        }, _localtime_js: function(e, t) {
          e = -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e), e = new Date(1e3 * e), S[t >> 2] = e.getSeconds(), S[t + 4 >> 2] = e.getMinutes(), S[t + 8 >> 2] = e.getHours(), S[t + 12 >> 2] = e.getDate(), S[t + 16 >> 2] = e.getMonth(), S[t + 20 >> 2] = e.getFullYear() - 1900, S[t + 24 >> 2] = e.getDay(), S[t + 28 >> 2] = (We(e.getFullYear()) ? Pr : Rr)[e.getMonth()] + e.getDate() - 1 | 0, S[t + 36 >> 2] = -(60 * e.getTimezoneOffset());
          var n = new Date(e.getFullYear(), 6, 1).getTimezoneOffset(), s = new Date(e.getFullYear(), 0, 1).getTimezoneOffset();
          S[t + 32 >> 2] = (n != s && e.getTimezoneOffset() == Math.min(s, n)) | 0;
        }, _mktime_js: function(e) {
          var t = new Date(S[e + 20 >> 2] + 1900, S[e + 16 >> 2], S[e + 12 >> 2], S[e + 8 >> 2], S[e + 4 >> 2], S[e >> 2], 0), n = S[e + 32 >> 2], s = t.getTimezoneOffset(), o = new Date(t.getFullYear(), 6, 1).getTimezoneOffset(), d = new Date(t.getFullYear(), 0, 1).getTimezoneOffset(), _ = Math.min(d, o);
          return 0 > n ? S[e + 32 >> 2] = +(o != d && _ == s) : 0 < n != (_ == s) && (o = Math.max(d, o), t.setTime(t.getTime() + 6e4 * ((0 < n ? _ : o) - s))), S[e + 24 >> 2] = t.getDay(), S[e + 28 >> 2] = (We(t.getFullYear()) ? Pr : Rr)[t.getMonth()] + t.getDate() - 1 | 0, S[e >> 2] = t.getSeconds(), S[e + 4 >> 2] = t.getMinutes(), S[e + 8 >> 2] = t.getHours(), S[e + 12 >> 2] = t.getDate(), S[e + 16 >> 2] = t.getMonth(), S[e + 20 >> 2] = t.getYear(), e = t.getTime(), isNaN(e) ? (S[qt() >> 2] = 61, e = -1) : e /= 1e3, BigInt(e);
        }, _tzset_js: (e, t, n) => {
          function s(I) {
            return (I = I.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? I[1] : "GMT";
          }
          var o = (/* @__PURE__ */ new Date()).getFullYear(), d = new Date(o, 0, 1), _ = new Date(o, 6, 1);
          o = d.getTimezoneOffset();
          var L = _.getTimezoneOffset();
          q[e >> 2] = 60 * Math.max(o, L), S[t >> 2] = +(o != L), e = s(d), t = s(_), e = Yt(e), t = Yt(t), L < o ? (q[n >> 2] = e, q[n + 4 >> 2] = t) : (q[n >> 2] = t, q[n + 4 >> 2] = e);
        }, abort: () => {
          X("native code called abort()");
        }, emscripten_date_now: () => Date.now(), emscripten_get_now: () => performance.now(), emscripten_resize_heap: (e) => {
          var t = lt.length;
          if (e >>>= 0, v(e > t), 2147483648 < e) return $(`Cannot enlarge memory, requested ${e} bytes, but the limit is ${2147483648} bytes!`), false;
          for (var n = 1; 4 >= n; n *= 2) {
            var s = t * (1 + 0.2 / n);
            s = Math.min(s, e + 100663296);
            var o = Math;
            s = Math.max(e, s), o = o.min.call(o, 2147483648, s + (65536 - s % 65536) % 65536);
            e: {
              s = o;
              var d = Je.buffer, _ = (s - d.byteLength + 65535) / 65536;
              try {
                Je.grow(_), lr();
                var L = 1;
                break e;
              } catch (I) {
                $(`growMemory: Attempted to grow heap from ${d.byteLength} bytes to ${s} bytes, but got error: ${I}`);
              }
              L = void 0;
            }
            if (L) return true;
          }
          return $(`Failed to grow the heap from ${t} bytes to ${o} bytes, not enough memory!`), false;
        }, environ_get: (e, t) => {
          var n = 0;
          return Ir().forEach((s, o) => {
            var d = t + n;
            for (o = q[e + 4 * o >> 2] = d, d = 0; d < s.length; ++d) v(s.charCodeAt(d) === (s.charCodeAt(d) & 255)), ee[o++ >> 0] = s.charCodeAt(d);
            ee[o >> 0] = 0, n += s.length + 1;
          }), 0;
        }, environ_sizes_get: (e, t) => {
          var n = Ir();
          q[e >> 2] = n.length;
          var s = 0;
          return n.forEach((o) => s += o.length + 1), q[t >> 2] = s, 0;
        }, exit: (e) => {
          Yn(), Xe = true, O(e, new yr(e));
        }, fd_close: function(e) {
          try {
            var t = ue(e);
            return i.close(t), 0;
          } catch (n) {
            if (typeof i > "u" || n.name !== "ErrnoError") throw n;
            return n.u;
          }
        }, fd_read: function(e, t, n, s) {
          try {
            e: {
              var o = ue(e);
              e = t;
              for (var d, _ = t = 0; _ < n; _++) {
                var L = q[e >> 2], I = q[e + 4 >> 2];
                e += 8;
                var T = i.read(o, ee, L, I, d);
                if (0 > T) {
                  var R = -1;
                  break e;
                }
                if (t += T, T < I) break;
                typeof d < "u" && (d += T);
              }
              R = t;
            }
            return q[s >> 2] = R, 0;
          } catch (F) {
            if (typeof i > "u" || F.name !== "ErrnoError") throw F;
            return F.u;
          }
        }, fd_seek: function(e, t, n, s) {
          t = -9007199254740992 > t || 9007199254740992 < t ? NaN : Number(t);
          try {
            if (isNaN(t)) return 61;
            var o = ue(e);
            return i.D(o, t, n), ut[s >> 3] = BigInt(o.position), o.ea && t === 0 && n === 0 && (o.ea = null), 0;
          } catch (d) {
            if (typeof i > "u" || d.name !== "ErrnoError") throw d;
            return d.u;
          }
        }, fd_write: function(e, t, n, s) {
          try {
            e: {
              var o = ue(e);
              e = t;
              for (var d, _ = t = 0; _ < n; _++) {
                var L = q[e >> 2], I = q[e + 4 >> 2];
                e += 8;
                var T = i.write(o, ee, L, I, d);
                if (0 > T) {
                  var R = -1;
                  break e;
                }
                t += T, typeof d < "u" && (d += T);
              }
              R = t;
            }
            return q[s >> 2] = R, 0;
          } catch (F) {
            if (typeof i > "u" || F.name !== "ErrnoError") throw F;
            return F.u;
          }
        }, invoke_vii: Hn, strftime: (e, t, n, s) => {
          function o(m, N, D) {
            for (m = typeof m == "number" ? m.toString() : m || ""; m.length < N; ) m = D[0] + m;
            return m;
          }
          function d(m, N) {
            return o(m, N, "0");
          }
          function _(m, N) {
            function D(ne) {
              return 0 > ne ? -1 : 0 < ne ? 1 : 0;
            }
            var H;
            return (H = D(m.getFullYear() - N.getFullYear())) === 0 && (H = D(m.getMonth() - N.getMonth())) === 0 && (H = D(m.getDate() - N.getDate())), H;
          }
          function L(m) {
            switch (m.getDay()) {
              case 0:
                return new Date(m.getFullYear() - 1, 11, 29);
              case 1:
                return m;
              case 2:
                return new Date(m.getFullYear(), 0, 3);
              case 3:
                return new Date(m.getFullYear(), 0, 2);
              case 4:
                return new Date(m.getFullYear(), 0, 1);
              case 5:
                return new Date(m.getFullYear() - 1, 11, 31);
              case 6:
                return new Date(m.getFullYear() - 1, 11, 30);
            }
          }
          function I(m) {
            var N = m.O;
            for (m = new Date(new Date(m.P + 1900, 0, 1).getTime()); 0 < N; ) {
              var D = m.getMonth(), H = (We(m.getFullYear()) ? xr : Ur)[D];
              if (N > H - m.getDate()) N -= H - m.getDate() + 1, m.setDate(1), 11 > D ? m.setMonth(D + 1) : (m.setMonth(0), m.setFullYear(m.getFullYear() + 1));
              else {
                m.setDate(m.getDate() + N);
                break;
              }
            }
            return D = new Date(m.getFullYear() + 1, 0, 4), N = L(new Date(m.getFullYear(), 0, 4)), D = L(D), 0 >= _(N, m) ? 0 >= _(D, m) ? m.getFullYear() + 1 : m.getFullYear() : m.getFullYear() - 1;
          }
          var T = q[s + 40 >> 2];
          s = { Va: S[s >> 2], Ua: S[s + 4 >> 2], $: S[s + 8 >> 2], la: S[s + 12 >> 2], aa: S[s + 16 >> 2], P: S[s + 20 >> 2], H: S[s + 24 >> 2], O: S[s + 28 >> 2], wb: S[s + 32 >> 2], Ta: S[s + 36 >> 2], Wa: T ? me(T) : "" }, n = me(n), T = { "%c": "%a %b %d %H:%M:%S %Y", "%D": "%m/%d/%y", "%F": "%Y-%m-%d", "%h": "%b", "%r": "%I:%M:%S %p", "%R": "%H:%M", "%T": "%H:%M:%S", "%x": "%m/%d/%y", "%X": "%H:%M:%S", "%Ec": "%c", "%EC": "%C", "%Ex": "%m/%d/%y", "%EX": "%H:%M:%S", "%Ey": "%y", "%EY": "%Y", "%Od": "%d", "%Oe": "%e", "%OH": "%H", "%OI": "%I", "%Om": "%m", "%OM": "%M", "%OS": "%S", "%Ou": "%u", "%OU": "%U", "%OV": "%V", "%Ow": "%w", "%OW": "%W", "%Oy": "%y" };
          for (var R in T) n = n.replace(new RegExp(R, "g"), T[R]);
          var F = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), G = "January February March April May June July August September October November December".split(" ");
          T = { "%a": (m) => F[m.H].substring(0, 3), "%A": (m) => F[m.H], "%b": (m) => G[m.aa].substring(0, 3), "%B": (m) => G[m.aa], "%C": (m) => d((m.P + 1900) / 100 | 0, 2), "%d": (m) => d(m.la, 2), "%e": (m) => o(m.la, 2, " "), "%g": (m) => I(m).toString().substring(2), "%G": (m) => I(m), "%H": (m) => d(m.$, 2), "%I": (m) => (m = m.$, m == 0 ? m = 12 : 12 < m && (m -= 12), d(m, 2)), "%j": (m) => {
            for (var N = 0, D = 0; D <= m.aa - 1; N += (We(m.P + 1900) ? xr : Ur)[D++]) ;
            return d(m.la + N, 3);
          }, "%m": (m) => d(m.aa + 1, 2), "%M": (m) => d(m.Ua, 2), "%n": () => `
`, "%p": (m) => 0 <= m.$ && 12 > m.$ ? "AM" : "PM", "%S": (m) => d(m.Va, 2), "%t": () => "	", "%u": (m) => m.H || 7, "%U": (m) => d(Math.floor((m.O + 7 - m.H) / 7), 2), "%V": (m) => {
            var N = Math.floor((m.O + 7 - (m.H + 6) % 7) / 7);
            if (2 >= (m.H + 371 - m.O - 2) % 7 && N++, N) N == 53 && (D = (m.H + 371 - m.O) % 7, D == 4 || D == 3 && We(m.P) || (N = 1));
            else {
              N = 52;
              var D = (m.H + 7 - m.O - 1) % 7;
              (D == 4 || D == 5 && We(m.P % 400 - 1)) && N++;
            }
            return d(N, 2);
          }, "%w": (m) => m.H, "%W": (m) => d(Math.floor((m.O + 7 - (m.H + 6) % 7) / 7), 2), "%y": (m) => (m.P + 1900).toString().substring(2), "%Y": (m) => m.P + 1900, "%z": (m) => {
            m = m.Ta;
            var N = 0 <= m;
            return m = Math.abs(m) / 60, (N ? "+" : "-") + ("0000" + (m / 60 * 100 + m % 60)).slice(-4);
          }, "%Z": (m) => m.Wa, "%%": () => "%" }, n = n.replace(/%%/g, "\0\0");
          for (R in T) n.includes(R) && (n = n.replace(new RegExp(R, "g"), T[R](s)));
          return n = n.replace(/\0\0/g, "%"), R = dt(n, false), R.length > t ? 0 : (Br(R, e), R.length - 1);
        }, system: (e) => {
          if (V) {
            if (!e) return 1;
            if (e = me(e), !e.length) return 0;
            e = xe("child_process").ub(e, [], { tb: true, stdio: "inherit" });
            var t = (n, s) => n << 8 | s;
            return e.status === null ? t(0, ((n) => {
              switch (n) {
                case "SIGHUP":
                  return 1;
                case "SIGQUIT":
                  return 3;
                case "SIGFPE":
                  return 8;
                case "SIGKILL":
                  return 9;
                case "SIGALRM":
                  return 14;
                case "SIGTERM":
                  return 15;
              }
              return 2;
            })(e.signal)) : e.status << 8 | 0;
          }
          return e ? (S[qt() >> 2] = 52, -1) : 0;
        } }, Ae = function() {
          var e = { env: jr, wasi_snapshot_preview1: jr };
          Nt("wasm-instantiate");
          var t = a;
          return Sn(e, function(n) {
            v(a === t, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"), t = null, Ae = n.instance.exports, Je = Ae.memory, v(Je, "memory not found in wasm exports"), lr(), oe = Ae.__indirect_function_table, v(oe, "table not found in wasm exports"), Ct.unshift(Ae.__wasm_call_ctors), ct("wasm-instantiate");
          }).catch(u), {};
        }();
        a._lua_checkstack = f("lua_checkstack"), a._lua_xmove = f("lua_xmove"), a._lua_atpanic = f("lua_atpanic"), a._lua_version = f("lua_version"), a._lua_absindex = f("lua_absindex"), a._lua_gettop = f("lua_gettop"), a._lua_settop = f("lua_settop"), a._lua_closeslot = f("lua_closeslot"), a._lua_rotate = f("lua_rotate"), a._lua_copy = f("lua_copy"), a._lua_pushvalue = f("lua_pushvalue"), a._lua_type = f("lua_type"), a._lua_typename = f("lua_typename"), a._lua_iscfunction = f("lua_iscfunction"), a._lua_isinteger = f("lua_isinteger"), a._lua_isnumber = f("lua_isnumber"), a._lua_isstring = f("lua_isstring"), a._lua_isuserdata = f("lua_isuserdata"), a._lua_rawequal = f("lua_rawequal"), a._lua_arith = f("lua_arith"), a._lua_compare = f("lua_compare"), a._lua_stringtonumber = f("lua_stringtonumber"), a._lua_tonumberx = f("lua_tonumberx"), a._lua_tointegerx = f("lua_tointegerx"), a._lua_toboolean = f("lua_toboolean"), a._lua_tolstring = f("lua_tolstring"), a._lua_rawlen = f("lua_rawlen"), a._lua_tocfunction = f("lua_tocfunction"), a._lua_touserdata = f("lua_touserdata"), a._lua_tothread = f("lua_tothread"), a._lua_topointer = f("lua_topointer"), a._lua_pushnil = f("lua_pushnil"), a._lua_pushnumber = f("lua_pushnumber"), a._lua_pushinteger = f("lua_pushinteger"), a._lua_pushlstring = f("lua_pushlstring"), a._lua_pushstring = f("lua_pushstring"), a._lua_pushcclosure = f("lua_pushcclosure"), a._lua_pushboolean = f("lua_pushboolean"), a._lua_pushlightuserdata = f("lua_pushlightuserdata"), a._lua_pushthread = f("lua_pushthread"), a._lua_getglobal = f("lua_getglobal"), a._lua_gettable = f("lua_gettable"), a._lua_getfield = f("lua_getfield"), a._lua_geti = f("lua_geti"), a._lua_rawget = f("lua_rawget"), a._lua_rawgeti = f("lua_rawgeti"), a._lua_rawgetp = f("lua_rawgetp"), a._lua_createtable = f("lua_createtable"), a._lua_getmetatable = f("lua_getmetatable"), a._lua_getiuservalue = f("lua_getiuservalue"), a._lua_setglobal = f("lua_setglobal"), a._lua_settable = f("lua_settable"), a._lua_setfield = f("lua_setfield"), a._lua_seti = f("lua_seti"), a._lua_rawset = f("lua_rawset"), a._lua_rawsetp = f("lua_rawsetp"), a._lua_rawseti = f("lua_rawseti"), a._lua_setmetatable = f("lua_setmetatable"), a._lua_setiuservalue = f("lua_setiuservalue"), a._lua_callk = f("lua_callk"), a._lua_pcallk = f("lua_pcallk"), a._lua_load = f("lua_load"), a._lua_dump = f("lua_dump"), a._lua_status = f("lua_status"), a._lua_error = f("lua_error"), a._lua_next = f("lua_next"), a._lua_toclose = f("lua_toclose"), a._lua_concat = f("lua_concat"), a._lua_len = f("lua_len"), a._lua_getallocf = f("lua_getallocf"), a._lua_setallocf = f("lua_setallocf"), a._lua_setwarnf = f("lua_setwarnf"), a._lua_warning = f("lua_warning"), a._lua_newuserdatauv = f("lua_newuserdatauv"), a._lua_getupvalue = f("lua_getupvalue"), a._lua_setupvalue = f("lua_setupvalue"), a._lua_upvalueid = f("lua_upvalueid"), a._lua_upvaluejoin = f("lua_upvaluejoin"), a._luaL_traceback = f("luaL_traceback"), a._lua_getstack = f("lua_getstack"), a._lua_getinfo = f("lua_getinfo"), a._luaL_buffinit = f("luaL_buffinit"), a._luaL_addstring = f("luaL_addstring"), a._luaL_prepbuffsize = f("luaL_prepbuffsize"), a._luaL_addvalue = f("luaL_addvalue"), a._luaL_pushresult = f("luaL_pushresult"), a._luaL_argerror = f("luaL_argerror"), a._luaL_typeerror = f("luaL_typeerror"), a._luaL_getmetafield = f("luaL_getmetafield"), a._luaL_where = f("luaL_where"), a._luaL_fileresult = f("luaL_fileresult");
        var qt = f("__errno_location");
        a._luaL_execresult = f("luaL_execresult"), a._luaL_newmetatable = f("luaL_newmetatable"), a._luaL_setmetatable = f("luaL_setmetatable"), a._luaL_testudata = f("luaL_testudata"), a._luaL_checkudata = f("luaL_checkudata"), a._luaL_optlstring = f("luaL_optlstring"), a._luaL_checklstring = f("luaL_checklstring"), a._luaL_checkstack = f("luaL_checkstack"), a._luaL_checktype = f("luaL_checktype"), a._luaL_checkany = f("luaL_checkany"), a._luaL_checknumber = f("luaL_checknumber"), a._luaL_optnumber = f("luaL_optnumber"), a._luaL_checkinteger = f("luaL_checkinteger"), a._luaL_optinteger = f("luaL_optinteger"), a._luaL_setfuncs = f("luaL_setfuncs"), a._luaL_addlstring = f("luaL_addlstring"), a._luaL_pushresultsize = f("luaL_pushresultsize"), a._luaL_buffinitsize = f("luaL_buffinitsize"), a._luaL_ref = f("luaL_ref"), a._luaL_unref = f("luaL_unref"), a._luaL_loadfilex = f("luaL_loadfilex"), a._luaL_loadbufferx = f("luaL_loadbufferx"), a._luaL_loadstring = f("luaL_loadstring"), a._luaL_callmeta = f("luaL_callmeta"), a._luaL_len = f("luaL_len"), a._luaL_tolstring = f("luaL_tolstring"), a._luaL_getsubtable = f("luaL_getsubtable"), a._luaL_requiref = f("luaL_requiref"), a._luaL_addgsub = f("luaL_addgsub"), a._luaL_gsub = f("luaL_gsub"), a._luaL_newstate = f("luaL_newstate"), a._lua_newstate = f("lua_newstate"), a._free = f("free"), a._realloc = f("realloc");
        var Hr = a._fflush = f("fflush");
        a._luaL_checkversion_ = f("luaL_checkversion_"), a._luaopen_base = f("luaopen_base"), a._luaopen_coroutine = f("luaopen_coroutine"), a._lua_newthread = f("lua_newthread"), a._lua_yieldk = f("lua_yieldk"), a._lua_isyieldable = f("lua_isyieldable"), a._lua_resetthread = f("lua_resetthread"), a._lua_resume = f("lua_resume"), a._luaopen_debug = f("luaopen_debug"), a._lua_gethookmask = f("lua_gethookmask"), a._lua_gethook = f("lua_gethook"), a._lua_gethookcount = f("lua_gethookcount"), a._lua_getlocal = f("lua_getlocal"), a._lua_sethook = f("lua_sethook"), a._lua_setlocal = f("lua_setlocal"), a._lua_setcstacklimit = f("lua_setcstacklimit");
        var Vn = a._malloc = f("malloc");
        a._luaL_openlibs = f("luaL_openlibs"), a._luaopen_package = f("luaopen_package"), a._luaopen_table = f("luaopen_table"), a._luaopen_io = f("luaopen_io"), a._luaopen_os = f("luaopen_os"), a._luaopen_string = f("luaopen_string"), a._luaopen_math = f("luaopen_math"), a._luaopen_utf8 = f("luaopen_utf8"), a._lua_close = f("lua_close");
        var jn = f("setThrew"), Yr = () => (Yr = Ae.emscripten_stack_init)(), Kt = () => (Kt = Ae.emscripten_stack_get_end)(), zr = f("stackSave"), Wr = f("stackRestore"), Gr = f("stackAlloc");
        function Hn(e, t, n) {
          var s = zr();
          try {
            Wt(e)(t, n);
          } catch (o) {
            if (Wr(s), o !== o + 0) throw o;
            jn(1, 0);
          }
        }
        a.ENV = _t, a.ccall = (e, t, n, s) => {
          var o = { string: (T) => {
            var R = 0;
            if (T != null && T !== 0) {
              R = Ye(T) + 1;
              var F = Gr(R);
              pt(T, F, R), R = F;
            }
            return R;
          }, array: (T) => {
            var R = Gr(T.length);
            return Br(T, R), R;
          } };
          e = Bn(e);
          var d = [], _ = 0;
          if (v(t !== "array", 'Return type should not be "array".'), s) for (var L = 0; L < s.length; L++) {
            var I = o[n[L]];
            I ? (_ === 0 && (_ = zr()), d[L] = I(s[L])) : d[L] = s[L];
          }
          return n = e.apply(null, d), n = function(T) {
            return _ !== 0 && Wr(_), t === "string" ? me(T) : t === "boolean" ? !!T : T;
          }(n);
        }, a.addFunction = (e, t) => {
          if (v(typeof e < "u"), !Ne) {
            Ne = /* @__PURE__ */ new WeakMap();
            var n = oe.length;
            if (Ne) for (var s = 0; s < 0 + n; s++) {
              var o = Wt(s);
              o && Ne.set(o, s);
            }
          }
          if (n = Ne.get(e) || 0) return n;
          if (Gt.length) n = Gt.pop();
          else {
            try {
              oe.grow(1);
            } catch (L) {
              throw L instanceof RangeError ? "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH." : L;
            }
            n = oe.length - 1;
          }
          try {
            s = n, oe.set(s, e), De[s] = oe.get(s);
          } catch (L) {
            if (!(L instanceof TypeError)) throw L;
            if (v(typeof t < "u", "Missing signature argument to addFunction: " + e), typeof WebAssembly.Function == "function") {
              s = WebAssembly.Function, o = { i: "i32", j: "i64", f: "f32", d: "f64", e: "externref", p: "i32" };
              for (var d = { parameters: [], results: t[0] == "v" ? [] : [o[t[0]]] }, _ = 1; _ < t.length; ++_) v(t[_] in o, "invalid signature char: " + t[_]), d.parameters.push(o[t[_]]);
              t = new s(d, e);
            } else {
              for (s = [1], o = t.slice(0, 1), t = t.slice(1), d = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 }, s.push(96), _ = t.length, v(16384 > _), 128 > _ ? s.push(_) : s.push(_ % 128 | 128, _ >> 7), _ = 0; _ < t.length; ++_) v(t[_] in d, "invalid signature char: " + t[_]), s.push(d[t[_]]);
              o == "v" ? s.push(0) : s.push(1, d[o]), t = [0, 97, 115, 109, 1, 0, 0, 0, 1], o = s.length, v(16384 > o), 128 > o ? t.push(o) : t.push(o % 128 | 128, o >> 7), t.push.apply(t, s), t.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0), t = new WebAssembly.Module(new Uint8Array(t)), t = new WebAssembly.Instance(t, { e: { f: e } }).exports.f;
            }
            s = n, oe.set(s, t), De[s] = oe.get(s);
          }
          return Ne.set(e, n), n;
        }, a.removeFunction = (e) => {
          Ne.delete(Wt(e)), oe.set(e, null), De[e] = oe.get(e), Gt.push(e);
        }, a.setValue = function(e, t, n = "i8") {
          switch (n.endsWith("*") && (n = "*"), n) {
            case "i1":
              ee[e >> 0] = t;
              break;
            case "i8":
              ee[e >> 0] = t;
              break;
            case "i16":
              Be[e >> 1] = t;
              break;
            case "i32":
              S[e >> 2] = t;
              break;
            case "i64":
              ut[e >> 3] = BigInt(t);
              break;
            case "float":
              kt[e >> 2] = t;
              break;
            case "double":
              St[e >> 3] = t;
              break;
            case "*":
              q[e >> 2] = t;
              break;
            default:
              X(`invalid type for setValue: ${n}`);
          }
        }, a.getValue = function(e, t = "i8") {
          switch (t.endsWith("*") && (t = "*"), t) {
            case "i1":
              return ee[e >> 0];
            case "i8":
              return ee[e >> 0];
            case "i16":
              return Be[e >> 1];
            case "i32":
              return S[e >> 2];
            case "i64":
              return ut[e >> 3];
            case "float":
              return kt[e >> 2];
            case "double":
              return St[e >> 3];
            case "*":
              return q[e >> 2];
            default:
              X(`invalid type for getValue: ${t}`);
          }
        }, a.stringToUTF8 = pt, a.lengthBytesUTF8 = Ye, a.stringToNewUTF8 = Yt, a.FS = i, "writeI53ToI64 writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling readI53FromI64 readI53FromU64 convertI32PairToI53 convertI32PairToI53Checked convertU32PairToI53 inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr getHostByName getCallstack emscriptenLog convertPCtoSourceLocation readEmAsmArgs jstoi_q jstoi_s listenOnce autoResumeAudioContext getDynCaller dynCall handleException runtimeKeepalivePush runtimeKeepalivePop callUserCallback maybeExit asmjsMangle handleAllocatorInit HandleAllocator getNativeTypeSize STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS cwrap reallyNegative unSign strLen reSign formatString intArrayToString AsciiToString UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 registerKeyEventCallback maybeCStringToJsString findEventTarget findCanvasEventTarget getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox softFullscreenResizeWebGLRenderTarget doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback registerPointerlockErrorEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback fillBatteryEventData battery registerBatteryEventCallback setCanvasElementSize getCanvasElementSize jsStackTrace stackTrace checkWasiClock wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags createDyncallWrapper safeSetTimeout setImmediateWrapped clearImmediateWrapped polyfillSetImmediate getPromise makePromise idsToPromises makePromiseCallback setMainLoop getSocketFromFD getSocketAddress FS_unlink FS_mkdirTree _setNetworkCallback".split(" ").forEach(function(e) {
          typeof globalThis > "u" || Object.getOwnPropertyDescriptor(globalThis, e) || Object.defineProperty(globalThis, e, { configurable: true, get() {
            var t = `\`${e}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`, n = e;
            n.startsWith("_") || (n = "$" + e), t += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${n}')`, gr(e) && (t += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"), je(t);
          } }), wr(e);
        }), "run addOnPreRun addOnInit addOnPreMain addOnExit addOnPostRun addRunDependency removeRunDependency FS_createFolder FS_createPath FS_createLazyFile FS_createLink FS_createDevice FS_readFile out err callMain abort wasmMemory wasmExports stackAlloc stackSave stackRestore getTempRet0 setTempRet0 writeStackCookie checkStackCookie MAX_INT53 MIN_INT53 bigintToI53Checked ptrToString zeroMemory exitJS getHeapMax growMemory MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE isLeapYear ydayFromDate arraySum addDays ERRNO_CODES ERRNO_MESSAGES setErrNo DNS Protocols Sockets initRandomFill randomFill timers warnOnce UNWIND_CACHE readEmAsmArgsArray getExecutableName keepRuntimeAlive asyncLoad alignMemory mmapAlloc wasmTable noExitRuntime getCFunc uleb128Encode sigToWasmTypes generateFuncType convertJsFunctionToWasm freeTableIndexes functionsInTableMap getEmptyTableSlot updateTableMap getFunctionAddress PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array intArrayFromString stringToAscii UTF16Decoder stringToUTF8OnStack writeArrayToMemory JSEvents specialHTMLTargets currentFullscreenStrategy restoreOldWindowedStyle demangle demangleAll ExitStatus getEnvStrings doReadv doWritev promiseMap Browser wget SYSCALLS preloadPlugins FS_createPreloadedFile FS_modeStringToFlags FS_getMode FS_stdin_getChar_buffer FS_stdin_getChar FS_createDataFile MEMFS TTY PIPEFS SOCKFS".split(" ").forEach(wr);
        var gt;
        Ze = function e() {
          gt || qr(), gt || (Ze = e);
        };
        function qr() {
          if (!(0 < $e)) {
            Yr();
            var e = Kt();
            if (v((e & 3) == 0), e == 0 && (e += 4), q[e >> 2] = 34821223, q[e + 4 >> 2] = 2310721022, q[0] = 1668509029, a.preRun) for (typeof a.preRun == "function" && (a.preRun = [a.preRun]); a.preRun.length; ) e = a.preRun.shift(), Mt.unshift(e);
            for (; 0 < Mt.length; ) Mt.shift()(a);
            if (!(0 < $e)) {
              if (!gt && (gt = true, a.calledRun = true, !Xe)) {
                for (v(!Dt), Dt = true, Ft(), a.noFSInit || i.R.Y || i.R(), i.ta = false; 0 < Ct.length; ) Ct.shift()(a);
                for (c(a), v(!a._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'), Ft(); 0 < dr.length; ) dr.shift()(a);
              }
              Ft();
            }
          }
        }
        function Yn() {
          var e = Ue, t = $, n = false;
          Ue = $ = () => {
            n = true;
          };
          try {
            Hr(0), ["stdout", "stderr"].forEach(function(s) {
              (s = Or("/dev/" + s)) && (s = It[s.object.rdev]) && s.output && s.output.length && (n = true);
            });
          } catch {
          }
          Ue = e, $ = t, n && je("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.");
        }
        return qr(), r.ready;
      };
    })();
    class ot {
      static async initialize(r, a) {
        const c = await En({ locateFile: (u, g) => r || g + u, preRun: (u) => {
          typeof a == "object" && Object.entries(a).forEach(([g, k]) => u.ENV[g] = k);
        } });
        return new ot(c);
      }
      constructor(r) {
        this.referenceTracker = /* @__PURE__ */ new WeakMap(), this.referenceMap = /* @__PURE__ */ new Map(), this.availableReferences = [], this.module = r, this.luaL_checkversion_ = this.cwrap("luaL_checkversion_", null, ["number", "number", "number"]), this.luaL_getmetafield = this.cwrap("luaL_getmetafield", "number", ["number", "number", "string"]), this.luaL_callmeta = this.cwrap("luaL_callmeta", "number", ["number", "number", "string"]), this.luaL_tolstring = this.cwrap("luaL_tolstring", "string", ["number", "number", "number"]), this.luaL_argerror = this.cwrap("luaL_argerror", "number", ["number", "number", "string"]), this.luaL_typeerror = this.cwrap("luaL_typeerror", "number", ["number", "number", "string"]), this.luaL_checklstring = this.cwrap("luaL_checklstring", "string", ["number", "number", "number"]), this.luaL_optlstring = this.cwrap("luaL_optlstring", "string", ["number", "number", "string", "number"]), this.luaL_checknumber = this.cwrap("luaL_checknumber", "number", ["number", "number"]), this.luaL_optnumber = this.cwrap("luaL_optnumber", "number", ["number", "number", "number"]), this.luaL_checkinteger = this.cwrap("luaL_checkinteger", "number", ["number", "number"]), this.luaL_optinteger = this.cwrap("luaL_optinteger", "number", ["number", "number", "number"]), this.luaL_checkstack = this.cwrap("luaL_checkstack", null, ["number", "number", "string"]), this.luaL_checktype = this.cwrap("luaL_checktype", null, ["number", "number", "number"]), this.luaL_checkany = this.cwrap("luaL_checkany", null, ["number", "number"]), this.luaL_newmetatable = this.cwrap("luaL_newmetatable", "number", ["number", "string"]), this.luaL_setmetatable = this.cwrap("luaL_setmetatable", null, ["number", "string"]), this.luaL_testudata = this.cwrap("luaL_testudata", "number", ["number", "number", "string"]), this.luaL_checkudata = this.cwrap("luaL_checkudata", "number", ["number", "number", "string"]), this.luaL_where = this.cwrap("luaL_where", null, ["number", "number"]), this.luaL_fileresult = this.cwrap("luaL_fileresult", "number", ["number", "number", "string"]), this.luaL_execresult = this.cwrap("luaL_execresult", "number", ["number", "number"]), this.luaL_ref = this.cwrap("luaL_ref", "number", ["number", "number"]), this.luaL_unref = this.cwrap("luaL_unref", null, ["number", "number", "number"]), this.luaL_loadfilex = this.cwrap("luaL_loadfilex", "number", ["number", "string", "string"]), this.luaL_loadbufferx = this.cwrap("luaL_loadbufferx", "number", ["number", "string|number", "number", "string|number", "string"]), this.luaL_loadstring = this.cwrap("luaL_loadstring", "number", ["number", "string"]), this.luaL_newstate = this.cwrap("luaL_newstate", "number", []), this.luaL_len = this.cwrap("luaL_len", "number", ["number", "number"]), this.luaL_addgsub = this.cwrap("luaL_addgsub", null, ["number", "string", "string", "string"]), this.luaL_gsub = this.cwrap("luaL_gsub", "string", ["number", "string", "string", "string"]), this.luaL_setfuncs = this.cwrap("luaL_setfuncs", null, ["number", "number", "number"]), this.luaL_getsubtable = this.cwrap("luaL_getsubtable", "number", ["number", "number", "string"]), this.luaL_traceback = this.cwrap("luaL_traceback", null, ["number", "number", "string", "number"]), this.luaL_requiref = this.cwrap("luaL_requiref", null, ["number", "string", "number", "number"]), this.luaL_buffinit = this.cwrap("luaL_buffinit", null, ["number", "number"]), this.luaL_prepbuffsize = this.cwrap("luaL_prepbuffsize", "string", ["number", "number"]), this.luaL_addlstring = this.cwrap("luaL_addlstring", null, ["number", "string", "number"]), this.luaL_addstring = this.cwrap("luaL_addstring", null, ["number", "string"]), this.luaL_addvalue = this.cwrap("luaL_addvalue", null, ["number"]), this.luaL_pushresult = this.cwrap("luaL_pushresult", null, ["number"]), this.luaL_pushresultsize = this.cwrap("luaL_pushresultsize", null, ["number", "number"]), this.luaL_buffinitsize = this.cwrap("luaL_buffinitsize", "string", ["number", "number", "number"]), this.lua_newstate = this.cwrap("lua_newstate", "number", ["number", "number"]), this.lua_close = this.cwrap("lua_close", null, ["number"]), this.lua_newthread = this.cwrap("lua_newthread", "number", ["number"]), this.lua_resetthread = this.cwrap("lua_resetthread", "number", ["number"]), this.lua_atpanic = this.cwrap("lua_atpanic", "number", ["number", "number"]), this.lua_version = this.cwrap("lua_version", "number", ["number"]), this.lua_absindex = this.cwrap("lua_absindex", "number", ["number", "number"]), this.lua_gettop = this.cwrap("lua_gettop", "number", ["number"]), this.lua_settop = this.cwrap("lua_settop", null, ["number", "number"]), this.lua_pushvalue = this.cwrap("lua_pushvalue", null, ["number", "number"]), this.lua_rotate = this.cwrap("lua_rotate", null, ["number", "number", "number"]), this.lua_copy = this.cwrap("lua_copy", null, ["number", "number", "number"]), this.lua_checkstack = this.cwrap("lua_checkstack", "number", ["number", "number"]), this.lua_xmove = this.cwrap("lua_xmove", null, ["number", "number", "number"]), this.lua_isnumber = this.cwrap("lua_isnumber", "number", ["number", "number"]), this.lua_isstring = this.cwrap("lua_isstring", "number", ["number", "number"]), this.lua_iscfunction = this.cwrap("lua_iscfunction", "number", ["number", "number"]), this.lua_isinteger = this.cwrap("lua_isinteger", "number", ["number", "number"]), this.lua_isuserdata = this.cwrap("lua_isuserdata", "number", ["number", "number"]), this.lua_type = this.cwrap("lua_type", "number", ["number", "number"]), this.lua_typename = this.cwrap("lua_typename", "string", ["number", "number"]), this.lua_tonumberx = this.cwrap("lua_tonumberx", "number", ["number", "number", "number"]), this.lua_tointegerx = this.cwrap("lua_tointegerx", "number", ["number", "number", "number"]), this.lua_toboolean = this.cwrap("lua_toboolean", "number", ["number", "number"]), this.lua_tolstring = this.cwrap("lua_tolstring", "string", ["number", "number", "number"]), this.lua_rawlen = this.cwrap("lua_rawlen", "number", ["number", "number"]), this.lua_tocfunction = this.cwrap("lua_tocfunction", "number", ["number", "number"]), this.lua_touserdata = this.cwrap("lua_touserdata", "number", ["number", "number"]), this.lua_tothread = this.cwrap("lua_tothread", "number", ["number", "number"]), this.lua_topointer = this.cwrap("lua_topointer", "number", ["number", "number"]), this.lua_arith = this.cwrap("lua_arith", null, ["number", "number"]), this.lua_rawequal = this.cwrap("lua_rawequal", "number", ["number", "number", "number"]), this.lua_compare = this.cwrap("lua_compare", "number", ["number", "number", "number", "number"]), this.lua_pushnil = this.cwrap("lua_pushnil", null, ["number"]), this.lua_pushnumber = this.cwrap("lua_pushnumber", null, ["number", "number"]), this.lua_pushinteger = this.cwrap("lua_pushinteger", null, ["number", "number"]), this.lua_pushlstring = this.cwrap("lua_pushlstring", "string", ["number", "string|number", "number"]), this.lua_pushstring = this.cwrap("lua_pushstring", "string", ["number", "string|number"]), this.lua_pushcclosure = this.cwrap("lua_pushcclosure", null, ["number", "number", "number"]), this.lua_pushboolean = this.cwrap("lua_pushboolean", null, ["number", "number"]), this.lua_pushlightuserdata = this.cwrap("lua_pushlightuserdata", null, ["number", "number"]), this.lua_pushthread = this.cwrap("lua_pushthread", "number", ["number"]), this.lua_getglobal = this.cwrap("lua_getglobal", "number", ["number", "string"]), this.lua_gettable = this.cwrap("lua_gettable", "number", ["number", "number"]), this.lua_getfield = this.cwrap("lua_getfield", "number", ["number", "number", "string"]), this.lua_geti = this.cwrap("lua_geti", "number", ["number", "number", "number"]), this.lua_rawget = this.cwrap("lua_rawget", "number", ["number", "number"]), this.lua_rawgeti = this.cwrap("lua_rawgeti", "number", ["number", "number", "number"]), this.lua_rawgetp = this.cwrap("lua_rawgetp", "number", ["number", "number", "number"]), this.lua_createtable = this.cwrap("lua_createtable", null, ["number", "number", "number"]), this.lua_newuserdatauv = this.cwrap("lua_newuserdatauv", "number", ["number", "number", "number"]), this.lua_getmetatable = this.cwrap("lua_getmetatable", "number", ["number", "number"]), this.lua_getiuservalue = this.cwrap("lua_getiuservalue", "number", ["number", "number", "number"]), this.lua_setglobal = this.cwrap("lua_setglobal", null, ["number", "string"]), this.lua_settable = this.cwrap("lua_settable", null, ["number", "number"]), this.lua_setfield = this.cwrap("lua_setfield", null, ["number", "number", "string"]), this.lua_seti = this.cwrap("lua_seti", null, ["number", "number", "number"]), this.lua_rawset = this.cwrap("lua_rawset", null, ["number", "number"]), this.lua_rawseti = this.cwrap("lua_rawseti", null, ["number", "number", "number"]), this.lua_rawsetp = this.cwrap("lua_rawsetp", null, ["number", "number", "number"]), this.lua_setmetatable = this.cwrap("lua_setmetatable", "number", ["number", "number"]), this.lua_setiuservalue = this.cwrap("lua_setiuservalue", "number", ["number", "number", "number"]), this.lua_callk = this.cwrap("lua_callk", null, ["number", "number", "number", "number", "number"]), this.lua_pcallk = this.cwrap("lua_pcallk", "number", ["number", "number", "number", "number", "number", "number"]), this.lua_load = this.cwrap("lua_load", "number", ["number", "number", "number", "string", "string"]), this.lua_dump = this.cwrap("lua_dump", "number", ["number", "number", "number", "number"]), this.lua_yieldk = this.cwrap("lua_yieldk", "number", ["number", "number", "number", "number"]), this.lua_resume = this.cwrap("lua_resume", "number", ["number", "number", "number", "number"]), this.lua_status = this.cwrap("lua_status", "number", ["number"]), this.lua_isyieldable = this.cwrap("lua_isyieldable", "number", ["number"]), this.lua_setwarnf = this.cwrap("lua_setwarnf", null, ["number", "number", "number"]), this.lua_warning = this.cwrap("lua_warning", null, ["number", "string", "number"]), this.lua_error = this.cwrap("lua_error", "number", ["number"]), this.lua_next = this.cwrap("lua_next", "number", ["number", "number"]), this.lua_concat = this.cwrap("lua_concat", null, ["number", "number"]), this.lua_len = this.cwrap("lua_len", null, ["number", "number"]), this.lua_stringtonumber = this.cwrap("lua_stringtonumber", "number", ["number", "string"]), this.lua_getallocf = this.cwrap("lua_getallocf", "number", ["number", "number"]), this.lua_setallocf = this.cwrap("lua_setallocf", null, ["number", "number", "number"]), this.lua_toclose = this.cwrap("lua_toclose", null, ["number", "number"]), this.lua_closeslot = this.cwrap("lua_closeslot", null, ["number", "number"]), this.lua_getstack = this.cwrap("lua_getstack", "number", ["number", "number", "number"]), this.lua_getinfo = this.cwrap("lua_getinfo", "number", ["number", "string", "number"]), this.lua_getlocal = this.cwrap("lua_getlocal", "string", ["number", "number", "number"]), this.lua_setlocal = this.cwrap("lua_setlocal", "string", ["number", "number", "number"]), this.lua_getupvalue = this.cwrap("lua_getupvalue", "string", ["number", "number", "number"]), this.lua_setupvalue = this.cwrap("lua_setupvalue", "string", ["number", "number", "number"]), this.lua_upvalueid = this.cwrap("lua_upvalueid", "number", ["number", "number", "number"]), this.lua_upvaluejoin = this.cwrap("lua_upvaluejoin", null, ["number", "number", "number", "number", "number"]), this.lua_sethook = this.cwrap("lua_sethook", null, ["number", "number", "number", "number"]), this.lua_gethook = this.cwrap("lua_gethook", "number", ["number"]), this.lua_gethookmask = this.cwrap("lua_gethookmask", "number", ["number"]), this.lua_gethookcount = this.cwrap("lua_gethookcount", "number", ["number"]), this.lua_setcstacklimit = this.cwrap("lua_setcstacklimit", "number", ["number", "number"]), this.luaopen_base = this.cwrap("luaopen_base", "number", ["number"]), this.luaopen_coroutine = this.cwrap("luaopen_coroutine", "number", ["number"]), this.luaopen_table = this.cwrap("luaopen_table", "number", ["number"]), this.luaopen_io = this.cwrap("luaopen_io", "number", ["number"]), this.luaopen_os = this.cwrap("luaopen_os", "number", ["number"]), this.luaopen_string = this.cwrap("luaopen_string", "number", ["number"]), this.luaopen_utf8 = this.cwrap("luaopen_utf8", "number", ["number"]), this.luaopen_math = this.cwrap("luaopen_math", "number", ["number"]), this.luaopen_debug = this.cwrap("luaopen_debug", "number", ["number"]), this.luaopen_package = this.cwrap("luaopen_package", "number", ["number"]), this.luaL_openlibs = this.cwrap("luaL_openlibs", null, ["number"]);
      }
      lua_remove(r, a) {
        this.lua_rotate(r, a, -1), this.lua_pop(r, 1);
      }
      lua_pop(r, a) {
        this.lua_settop(r, -a - 1);
      }
      luaL_getmetatable(r, a) {
        return this.lua_getfield(r, U, a);
      }
      lua_yield(r, a) {
        return this.lua_yieldk(r, a, 0, null);
      }
      lua_upvalueindex(r) {
        return U - r;
      }
      ref(r) {
        const a = this.referenceTracker.get(r);
        if (a) return a.refCount++, a.index;
        const c = this.availableReferences.pop(), u = c === void 0 ? this.referenceMap.size + 1 : c;
        return this.referenceMap.set(u, r), this.referenceTracker.set(r, { refCount: 1, index: u }), this.lastRefIndex = u, u;
      }
      unref(r) {
        const a = this.referenceMap.get(r);
        if (a === void 0) return;
        const c = this.referenceTracker.get(a);
        if (c === void 0) {
          this.referenceTracker.delete(a), this.availableReferences.push(r);
          return;
        }
        c.refCount--, c.refCount <= 0 && (this.referenceTracker.delete(a), this.referenceMap.delete(r), this.availableReferences.push(r));
      }
      getRef(r) {
        return this.referenceMap.get(r);
      }
      getLastRefIndex() {
        return this.lastRefIndex;
      }
      printRefs() {
        for (const [r, a] of this.referenceMap.entries()) console.log(r, a);
      }
      cwrap(r, a, c) {
        return c.some((g) => g === "string|number") ? (...g) => {
          const k = [], O = c.map((M, j) => {
            var V;
            if (M === "string|number") {
              if (typeof g[j] == "number") return "number";
              if (((V = g[j]) === null || V === void 0 ? void 0 : V.length) > 1024) {
                const Y = this.module.stringToNewUTF8(g[j]);
                return g[j] = Y, k.push(Y), "number";
              } else return "string";
            }
            return M;
          });
          try {
            return this.module.ccall(r, a, O, g);
          } finally {
            for (const M of k) this.module._free(M);
          }
        } : (...g) => this.module.ccall(r, a, c, g);
      }
    }
    var Ln = "1.16.0";
    class Tn {
      constructor(r, a) {
        var c;
        r === void 0 && (typeof window == "object" && typeof window.document < "u" || typeof self == "object" && ((c = self?.constructor) === null || c === void 0 ? void 0 : c.name) === "DedicatedWorkerGlobalScope") && (r = `https://unpkg.com/wasmoon@${Ln}/dist/glue.wasm`), this.luaWasmPromise = ot.initialize(r, a);
      }
      async mountFile(r, a) {
        this.mountFileSync(await this.getLuaModule(), r, a);
      }
      mountFileSync(r, a, c) {
        const u = a.lastIndexOf("/"), g = a.substring(u + 1), k = a.substring(0, a.length - g.length - 1);
        if (k.length > 0) {
          const O = k.split("/").reverse();
          let M = "";
          for (; O.length; ) {
            const j = O.pop();
            if (!j) continue;
            const V = `${M}/${j}`;
            try {
              r.module.FS.mkdir(V);
            } catch {
            }
            M = V;
          }
        }
        r.module.FS.writeFile(a, c);
      }
      async createEngine(r = {}) {
        return new ir(await this.getLuaModule(), r);
      }
      async getLuaModule() {
        return this.luaWasmPromise;
      }
    }
    l.Decoration = z, l.LUAI_MAXSTACK = A, l.LUA_MULTRET = E, l.LUA_REGISTRYINDEX = U, l.LuaEngine = ir, l.LuaFactory = Tn, l.LuaGlobal = pe, l.LuaMultiReturn = Q, l.LuaRawResult = Te, l.LuaThread = ie, l.LuaTimeoutError = W, l.LuaTypeExtension = de, l.LuaWasm = ot, l.PointerSize = w, l.decorate = P, l.decorateFunction = re, l.decorateProxy = sr, l.decorateUserdata = wn;
  });
})(er, er.exports);
var ia = er.exports;
const oa = `
-- \u2500\u2500 helpers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

local function esc(s)
  s = tostring(s)
  s = s:gsub('\\\\', '\\\\\\\\')
  s = s:gsub('"',  '\\\\"')
  s = s:gsub('\\n', '\\\\n')
  s = s:gsub('\\r', '\\\\r')
  s = s:gsub('\\t', '\\\\t')
  -- control chars
  s = s:gsub('[%c]', function(c)
    return string.format('\\\\u%04x', string.byte(c))
  end)
  return '"' .. s .. '"'
end

local function numval(v)
  if type(v) == "number" then
    if v ~= v or v == math.huge or v == -math.huge then return "0" end
    -- integers: no decimal point
    if v == math.floor(v) and math.abs(v) < 1e15 then
      return string.format("%d", v)
    end
    return string.format("%.17g", v)
  end
  return "0"
end

local function boolval(v) return (v and v ~= false) and "true" or "false" end

-- \u2500\u2500 buff serialiser \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

local function encodeBuffs(list)
  if #list == 0 then return "[]" end
  local parts = {}
  for _, b in ipairs(list) do
    parts[#parts+1] =
      '{"name":'             .. esc(b.name)           ..
      ',"typeKey":'          .. esc(b.typeKey)         ..
      ',"spellId":'          .. numval(b.spellId)      ..
      ',"timeLeft":'         .. numval(b.timeLeft)     ..
      ',"setTimeEpoch":'     .. numval(b.setTimeEpoch) ..
      ',"playedCacheSetAt":' .. numval(b.playedCacheSetAt) ..
      ',"track":'            .. boolval(b.track)       ..
      ',"isStored":'         .. boolval(b.isStored)    ..
      ',"dmfPercentage":'    .. numval(b.dmfPercentage) .. '}'
  end
  return '[' .. table.concat(parts, ',') .. ']'
end

-- \u2500\u2500 faction heuristic \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

local FACTION_HINTS = {
  "myChars","onyTimer","nefTimer","rendTimer",
  "onyYell","rendYell","zanYell","wintergraspTime","layerBuffs"
}
local function isFactionTable(t)
  if type(t) ~= "table" then return false end
  for _, h in ipairs(FACTION_HINTS) do
    if t[h] ~= nil then return true end
  end
  return false
end

-- \u2500\u2500 timer definitions (mirrors the static rows[] in nwb_parser.cpp) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

local TIMER_DEFS = {
  { name="Onyxia (Rallying Cry)",      main="onyTimer",  alt="onyYell"  },
  { name="Nefarian (Might of Onyxia)", main="nefTimer",  alt="nefYell"  },
  { name="Warchief's Blessing (Rend)", main="rendTimer", alt="rendYell" },
  { name="Spirit of Zandalar",         main="zanYell",   alt="zanYell2" },
}

-- \u2500\u2500 faction harvest \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

local function harvestFaction(realmName, factionName, facData)

  -- \u2500\u2500 characters \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  local myChars = facData.myChars
  if type(myChars) == "table" then
    for charKey, charData in pairs(myChars) do
      if type(charData) == "table" then

        local cName    = (type(charData.playerName)    == "string" and charData.playerName    ~= "") and charData.playerName    or tostring(charKey)
        local cRealm   = (type(charData.realm)         == "string" and charData.realm         ~= "") and charData.realm         or realmName
        local cFaction = (type(charData.faction)       == "string" and charData.faction       ~= "") and charData.faction       or factionName
        local cGuild   = (type(charData.guild)         == "string") and charData.guild         or ""
        local cClass   = (type(charData.englishClass)  == "string") and charData.englishClass  or ""
        local cLevel   = (type(charData.level)         == "number") and charData.level         or 0
        local cSeen    = (type(charData.lo)            == "number") and charData.lo            or 0

        local buffs = {}

        -- collect storedBuff names first (to skip shadows in buffs table)
        local storedNames = {}
        if type(charData.storedBuffs) == "table" then
          for bName, _ in pairs(charData.storedBuffs) do
            storedNames[bName] = true
          end
        end

        -- harvest storedBuffs (Chronoboon'd)
        if type(charData.storedBuffs) == "table" then
          for bName, bData in pairs(charData.storedBuffs) do
            if type(bData) == "table" then
              local tl = (type(bData.timeLeft) == "number") and bData.timeLeft or 0
              if tl > 0 then
                buffs[#buffs+1] = {
                  name             = tostring(bName),
                  typeKey          = (type(bData.type)             == "string") and bData.type             or "",
                  spellId          = (type(bData.spellID)          == "number") and bData.spellID          or 0,
                  timeLeft         = tl,
                  setTimeEpoch     = (type(bData.setTime)          == "number") and bData.setTime          or 0,
                  playedCacheSetAt = (type(bData.playedCacheSetAt) == "number") and bData.playedCacheSetAt or 0,
                  track            = (bData.track == true),
                  isStored         = true,
                  dmfPercentage    = (type(bData.dmfPercent)       == "number") and bData.dmfPercent       or 0,
                }
              end
            end
          end
        end

        -- harvest active buffs; skip entries that are shadows of storedBuffs
        if type(charData.buffs) == "table" then
          for bName, bData in pairs(charData.buffs) do
            if type(bData) == "table" then
              local tl = (type(bData.timeLeft) == "number") and bData.timeLeft or 0
              if tl > 0 then
                -- skip if track=false AND already in storedBuffs (stale shadow)
                local skip = (bData.track ~= true) and storedNames[bName]
                if not skip then
                  buffs[#buffs+1] = {
                    name             = tostring(bName),
                    typeKey          = (type(bData.type)             == "string") and bData.type             or "",
                    spellId          = (type(bData.spellID)          == "number") and bData.spellID          or 0,
                    timeLeft         = tl,
                    setTimeEpoch     = (type(bData.setTime)          == "number") and bData.setTime          or 0,
                    playedCacheSetAt = (type(bData.playedCacheSetAt) == "number") and bData.playedCacheSetAt or 0,
                    track            = (bData.track == true),
                    isStored         = false,
                    dmfPercentage    = (type(bData.dmfPercent)       == "number") and bData.dmfPercent       or 0,
                  }
                end
              end
            end
          end
        end

        local charJson =
          '{"name":'          .. esc(cName)            ..
          ',"realm":'         .. esc(cRealm)           ..
          ',"faction":'       .. esc(cFaction)         ..
          ',"guild":'         .. esc(cGuild)           ..
          ',"className":'     .. esc(cClass)           ..
          ',"account":""'                              ..
          ',"level":'         .. numval(cLevel)        ..
          ',"lastSeenEpoch":' .. numval(cSeen)         ..
          ',"buffs":'         .. encodeBuffs(buffs)    .. '}'
        _js_push_char(charJson)

      end -- type(charData) == "table"
    end -- pairs(myChars)
  end -- myChars

  -- \u2500\u2500 top-level timers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  for _, td in ipairs(TIMER_DEFS) do
    local drop = facData[td.main]
    if type(drop) ~= "number" or drop <= 0 then drop = facData[td.alt] end
    if type(drop) == "number" and drop > 0 then
      _js_push_timer(
        '{"realm":'              .. esc(realmName .. " [" .. factionName .. "]") ..
        ',"buffName":'           .. esc(td.name)   ..
        ',"dropEpoch":'          .. numval(drop)   ..
        ',"nextExpectedEpoch":0' ..
        ',"layer":0}'
      )
    end
  end

  -- \u2500\u2500 layer buffs \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  if type(facData.layerBuffs) == "table" then
    for layerId, layerData in pairs(facData.layerBuffs) do
      if type(layerData) == "table" then
        local lid = (type(layerId) == "number") and layerId or 0
        for _, td in ipairs(TIMER_DEFS) do
          local drop = layerData[td.main]
          if type(drop) ~= "number" or drop <= 0 then drop = layerData[td.alt] end
          if type(drop) == "number" and drop > 0 then
            _js_push_timer(
              '{"realm":'              .. esc(realmName .. " [" .. factionName .. "]") ..
              ',"buffName":'           .. esc(td.name)   ..
              ',"dropEpoch":'          .. numval(drop)   ..
              ',"nextExpectedEpoch":0' ..
              ',"layer":'             .. numval(lid) .. '}'
            )
          end
        end
      end
    end
  end

end -- harvestFaction

-- \u2500\u2500 walk NWBdatabase.global \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

if type(NWBdatabase) == "table" and type(NWBdatabase.global) == "table" then
  for realmName, realmData in pairs(NWBdatabase.global) do
    if type(realmName) == "string" and type(realmData) == "table" then
      for _, faction in ipairs({"Alliance", "Horde", "Neutral"}) do
        local facData = realmData[faction]
        if isFactionTable(facData) then
          harvestFaction(realmName, faction, facData)
        end
      end
    end
  end
end

-- \u2500\u2500 capture top-level globals for the Explorer tab \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

local STDLIB = {
  _G=true, _VERSION=true, string=true, table=true, math=true, io=true, os=true,
  coroutine=true, package=true, debug=true, utf8=true, print=true, require=true,
  pairs=true, ipairs=true, next=true, type=true, tostring=true, tonumber=true,
  select=true, error=true, assert=true, pcall=true, xpcall=true, rawget=true,
  rawset=true, rawequal=true, rawlen=true, setmetatable=true, getmetatable=true,
  collectgarbage=true, load=true, loadstring=true, dofile=true, loadfile=true,
  -- injected callbacks
  _js_push_char=true, _js_push_timer=true, _js_push_global=true,
}

for k, v in pairs(_G) do
  if not STDLIB[k] then
    local t = type(v)
    local desc
    if t == "boolean" then
      desc = v and "true" or "false"
    elseif t == "number" then
      desc = numval(v)
    elseif t == "string" then
      desc = (#v > 60) and (v:sub(1, 57) .. "...") or v
    elseif t == "table" then
      local n = 0
      for _ in pairs(v) do n = n + 1; if n >= 9999 then break end end
      desc = "table[" .. n .. "]"
    else
      desc = t
    end
    _js_push_global(tostring(k), desc)
  end
end
`;
let Xt = null;
async function la() {
  if (!Xt) {
    const h = new URL("/glue.wasm", window.location.origin).href;
    Xt = new ia.LuaFactory(h);
  }
  return Xt;
}
async function ua(h, p, l) {
  const w = await (await la()).createEngine({ openStandardLibs: true, injectObjects: false }), E = [], A = [], U = [];
  let W = "";
  try {
    w.global.set("_js_push_char", (z) => {
      try {
        const P = JSON.parse(z);
        E.push(P);
      } catch {
      }
    }), w.global.set("_js_push_timer", (z) => {
      try {
        const P = JSON.parse(z);
        A.push(P);
      } catch {
      }
    }), w.global.set("_js_push_global", (z, P) => {
      U.push([z, P]);
    }), await w.doString(h), await w.doString(oa);
  } catch (z) {
    W = z instanceof Error ? z.message : String(z);
  } finally {
    w.global.close();
  }
  return { fileMTimeEpoch: l, parsedAtEpoch: Math.floor(Date.now() / 1e3), error: W, sourceFiles: [p], characters: E, timers: A, globals: U };
}
function ca(h) {
  const p = { fileMTimeEpoch: 0, parsedAtEpoch: Math.floor(Date.now() / 1e3), error: "", sourceFiles: [], characters: [], timers: [], globals: [] }, l = [];
  for (const { snap: y, account: w } of h) {
    if (y.fileMTimeEpoch > p.fileMTimeEpoch && (p.fileMTimeEpoch = y.fileMTimeEpoch), p.sourceFiles.push(...y.sourceFiles), y.error) {
      l.push(`[${w}] ${y.error}`);
      continue;
    }
    for (const E of y.characters) p.characters.push({ ...E, account: w });
    p.timers.push(...y.timers);
    for (const [E, A] of y.globals) p.globals.push([`[${w}] ${E}`, A]);
  }
  return p.error = l.join("  |  "), p;
}
function da(h) {
  if (h <= 0) return "expired";
  const p = Math.floor(h / 3600), l = Math.floor(h % 3600 / 60), y = h % 60;
  return p > 0 ? `${p}h ${nt(l)}m ${nt(y)}s` : `${nt(l)}m ${nt(y)}s`;
}
function at(h, p = Ee()) {
  if (h <= 0) return "\u2014";
  const l = p - h;
  if (l < 0) return "\u2014";
  if (l < 60) return `${l}s ago`;
  if (l < 3600) return `${Math.floor(l / 60)}m ago`;
  if (l < 86400) {
    const y = Math.floor(l / 3600), w = Math.floor(l % 3600 / 60);
    return `${y}h ${nt(w)}m ago`;
  }
  return `${Math.floor(l / 86400)}d ago`;
}
function fa(h) {
  return h <= 0 ? "\u2014" : new Date(h * 1e3).toLocaleString(void 0, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
function Ee() {
  return Math.floor(Date.now() / 1e3);
}
function nt(h) {
  return String(h).padStart(2, "0");
}
const ha = { WARRIOR: "#c69b3a", PALADIN: "#f48cba", HUNTER: "#aad372", ROGUE: "#fff468", PRIEST: "#f0ede8", DEATHKNIGHT: "#c41e3a", SHAMAN: "#0070dd", MAGE: "#3fc7eb", WARLOCK: "#8788ee", DRUID: "#ff7c0a" };
function ma(h) {
  return ha[h.toUpperCase()] ?? "#a8a090";
}
const pa = { ony: "Ony", nef: "Nef", rend: "Rend", zan: "ZG", zandalar: "ZG", songflower: "Songflower", moxie: "Moxie", savvy: "Savvy", spirit: "Spirit", spiritZanza: "Spirit", dmf: "DMF", sayge: "Sayge", rallying: "Rally" };
function _a(h) {
  return pa[h] ?? h;
}
function ga(h, p) {
  if (p.innerHTML = "", h.characters.length === 0) {
    p.innerHTML = '<p class="empty-msg">No characters found. Check the Explorer tab for raw globals.</p>';
    return;
  }
  const l = Ee(), y = /* @__PURE__ */ new Map();
  for (const w of h.characters) {
    const E = w.account || "(unknown account)";
    y.has(E) || y.set(E, []), y.get(E).push(w);
  }
  for (const [w, E] of y) {
    E.sort((P, K) => K.lastSeenEpoch - P.lastSeenEpoch);
    const A = te("div", "char-group"), U = te("div", "char-group-header");
    U.textContent = w, A.appendChild(U);
    const W = te("table", "char-table");
    W.innerHTML = `
      <thead>
        <tr>
          <th>Character</th>
          <th>Realm</th>
          <th>Lvl</th>
          <th>Buffs</th>
          <th class="col-seen">Last seen</th>
        </tr>
      </thead>`;
    const z = te("tbody");
    for (const P of E) {
      const K = P.lastSeenEpoch > 0 && l - P.lastSeenEpoch > 86400, Q = te("tr", K ? "char-row stale" : "char-row"), ce = te("td", "char-name"), ie = te("span");
      if (ie.textContent = P.name, ie.style.color = ma(P.className), ce.appendChild(ie), P.guild) {
        const re = te("span", "char-guild");
        re.textContent = `<${P.guild}>`, ce.appendChild(re);
      }
      if (P.className) {
        const re = te("span", "char-class");
        re.textContent = P.className.charAt(0) + P.className.slice(1).toLowerCase(), ce.appendChild(re);
      }
      Q.appendChild(ce);
      const pe = te("td", "char-realm");
      if (pe.textContent = P.realm, P.faction) {
        const re = te("span", `faction-badge faction-${P.faction.toLowerCase()}`);
        re.textContent = P.faction === "Alliance" ? "A" : P.faction === "Horde" ? "H" : "N", pe.appendChild(re);
      }
      Q.appendChild(pe);
      const de = te("td", "char-level");
      de.textContent = P.level > 0 ? String(P.level) : "\u2014", Q.appendChild(de);
      const qe = te("td", "char-buffs"), it = P.buffs.filter((re) => re.track && re.timeLeft > 0);
      if (it.length === 0) qe.innerHTML = '<span class="no-buffs">\u2014</span>';
      else for (const re of it) qe.appendChild(ba(re, l));
      Q.appendChild(qe);
      const Te = te("td", "char-seen");
      Te.textContent = P.lastSeenEpoch > 0 ? at(P.lastSeenEpoch, l) : "\u2014", Q.appendChild(Te), z.appendChild(Q);
    }
    W.appendChild(z), A.appendChild(W), p.appendChild(A);
  }
}
function ba(h, p) {
  const l = te("span", `buff-badge buff-${h.typeKey}`), y = te("span", "buff-label");
  y.textContent = _a(h.typeKey) || h.name, l.appendChild(y);
  const w = te("span", "buff-time"), E = h.setTimeEpoch > 0 ? at(h.setTimeEpoch, p) : "";
  if (w.textContent = da(h.timeLeft) + (E ? ` (as of ${E})` : ""), l.appendChild(w), h.isStored) {
    const A = te("span", "buff-stored");
    A.textContent = "\u{1F9CA}", A.title = "Chronoboon\u2019d", l.appendChild(A);
  }
  return l;
}
function te(h, p) {
  const l = document.createElement(h);
  return p && (l.className = p), l;
}
function wa(h, p) {
  if (p.innerHTML = "", h.timers.length === 0) {
    p.innerHTML = '<p class="empty-msg">No server timer data found.</p>';
    return;
  }
  const l = Ee(), y = /* @__PURE__ */ new Map();
  for (const w of h.timers) y.has(w.realm) || y.set(w.realm, []), y.get(w.realm).push(w);
  for (const [w, E] of y) {
    E.sort((P, K) => K.dropEpoch - P.dropEpoch);
    const A = ye("div", "timer-group"), U = ye("div", "timer-group-header");
    U.textContent = w, A.appendChild(U);
    const W = ye("table", "timer-table");
    W.innerHTML = `
      <thead>
        <tr>
          <th>Buff</th>
          <th>Dropped at</th>
          <th>Age</th>
          <th>Layer</th>
        </tr>
      </thead>`;
    const z = ye("tbody");
    for (const P of E) {
      const K = ye("tr", "timer-row"), Q = ye("td", "timer-name");
      Q.textContent = P.buffName, K.appendChild(Q);
      const ce = ye("td", "timer-drop");
      ce.textContent = P.dropEpoch > 0 ? fa(P.dropEpoch) : "\u2014", K.appendChild(ce);
      const ie = ye("td", "timer-age");
      ie.textContent = P.dropEpoch > 0 ? at(P.dropEpoch, l) : "\u2014", K.appendChild(ie);
      const pe = ye("td", "timer-layer");
      pe.textContent = P.layer > 0 ? `Layer ${P.layer}` : "\u2014", K.appendChild(pe), z.appendChild(K);
    }
    W.appendChild(z), A.appendChild(W), p.appendChild(A);
  }
}
function ye(h, p) {
  const l = document.createElement(h);
  return p && (l.className = p), l;
}
function ya(h, p) {
  if (p.innerHTML = "", h.globals.length === 0) {
    p.innerHTML = '<p class="empty-msg">No globals captured. Load a file first.</p>';
    return;
  }
  if (h.sourceFiles.length > 0) {
    const E = Ge("div", "explorer-sources");
    E.textContent = "Source files: " + h.sourceFiles.join(", "), p.appendChild(E);
  }
  const l = Ge("table", "explorer-table");
  l.innerHTML = `
    <thead>
      <tr>
        <th>Global</th>
        <th>Value / Type</th>
      </tr>
    </thead>`;
  const y = Ge("tbody"), w = [...h.globals].sort((E, A) => E[0].localeCompare(A[0]));
  for (const [E, A] of w) {
    const U = Ge("tr"), W = Ge("td", "explorer-key");
    W.textContent = E, U.appendChild(W);
    const z = Ge("td", "explorer-val");
    z.textContent = A, U.appendChild(z), y.appendChild(U);
  }
  l.appendChild(y), p.appendChild(l);
}
function Ge(h, p) {
  const l = document.createElement(h);
  return p && (l.className = p), l;
}
const va = "nwb-online", Ea = 1, Oe = "handles", tr = "wtf-handle";
function rr() {
  return new Promise((h, p) => {
    const l = indexedDB.open(va, Ea);
    l.onupgradeneeded = () => {
      l.result.createObjectStore(Oe);
    }, l.onsuccess = () => h(l.result), l.onerror = () => p(l.error);
  });
}
async function La(h) {
  const p = await rr();
  return new Promise((l, y) => {
    const w = p.transaction(Oe, "readwrite");
    w.objectStore(Oe).put(h, tr), w.oncomplete = () => l(), w.onerror = () => y(w.error);
  });
}
async function Ta() {
  try {
    const h = await rr();
    return new Promise((p, l) => {
      const w = h.transaction(Oe, "readonly").objectStore(Oe).get(tr);
      w.onsuccess = () => p(w.result ?? null), w.onerror = () => l(w.error);
    });
  } catch {
    return null;
  }
}
async function ka() {
  try {
    const h = await rr();
    return new Promise((p, l) => {
      const y = h.transaction(Oe, "readwrite");
      y.objectStore(Oe).delete(tr), y.oncomplete = () => p(), y.onerror = () => l(y.error);
    });
  } catch {
  }
}
const Qr = "nwb:poll-interval", en = "nwb:tab";
function tn() {
  const h = localStorage.getItem(Qr), p = h !== null ? parseInt(h, 10) : 10;
  return isNaN(p) ? 10 : p;
}
function Sa(h) {
  localStorage.setItem(Qr, String(h));
}
function Fa() {
  return localStorage.getItem(en) ?? "characters";
}
function Ma(h) {
  localStorage.setItem(en, h);
}
const x = { snapshot: null, entries: [], dirHandle: null, lastCheckedAt: 0, lastChangedAt: 0, pollTimerId: null, currentTab: Fa() || "characters", mode: "none" }, ae = (h) => document.getElementById(h), rn = ae("landing"), nn = ae("app"), $r = ae("btn-pick-dir"), rt = ae("dnd-zone"), Ca = ae("file-input"), $t = ae("browser-hint"), Da = ae("status-checked"), Na = ae("status-changed"), Zt = ae("poll-select"), Aa = ae("btn-reload"), Oa = ae("btn-repick"), Qt = ae("error-banner"), an = { characters: ae("panel-characters"), timers: ae("panel-timers"), explorer: ae("panel-explorer") };
async function Pa() {
  Kr() ? ($r.classList.remove("hidden"), Jr() && rt.classList.remove("hidden"), $t.textContent = "Your browser supports auto-refresh. Pick your WTF folder once and we'll watch it.") : Jr() ? (rt.classList.remove("hidden"), $t.textContent = "Folder drop supported. Drag your WTF folder onto the zone above.") : $t.textContent = "Pick a single NovaWorldBuffs.lua file below (Firefox / Safari mode).", document.querySelectorAll(".tab").forEach((p) => {
    p.addEventListener("click", () => {
      const l = p.dataset.tab;
      l && on(l);
    });
  }), Zt.value = String(tn()), Zt.addEventListener("change", () => {
    const p = parseInt(Zt.value, 10);
    Sa(p), Ua();
  }), Aa.addEventListener("click", () => void Va()), Oa.addEventListener("click", () => void ja()), $r.addEventListener("click", () => void Ra());
  const h = ae("pick-zone");
  if (h.addEventListener("dragover", (p) => {
    p.preventDefault(), rt.classList.add("drag-over");
  }), h.addEventListener("dragleave", () => rt.classList.remove("drag-over")), h.addEventListener("drop", (p) => {
    p.preventDefault(), rt.classList.remove("drag-over"), p.dataTransfer && Ia(p.dataTransfer);
  }), ea(Ca, (p) => void xa(p)), Kr()) {
    const p = await Ta();
    if (p && await Wn(p)) {
      x.dirHandle = p, x.mode = "fsa", await sn(p);
      return;
    }
  }
  yt();
}
async function Ra() {
  try {
    const h = await zn();
    x.dirHandle = h, x.mode = "fsa", await La(h), await sn(h);
  } catch (h) {
    h?.name !== "AbortError" && Le(String(h));
  }
}
async function sn(h) {
  try {
    const p = await Gn(h);
    if (p.length === 0) {
      Le("No NovaWorldBuffs.lua files found. Make sure you picked your WTF folder (or WoW root)."), yt();
      return;
    }
    x.entries = p, await st("fsa"), ar(), vt();
  } catch (p) {
    Le(String(p)), yt();
  }
}
async function Ia(h) {
  try {
    const p = await Xn(h);
    if (p.length === 0) {
      Le("No NovaWorldBuffs.lua files found in the dropped folder.");
      return;
    }
    x.entries = p, x.mode = "dnd", await st("dnd"), ar();
  } catch (p) {
    Le(String(p));
  }
}
async function xa(h) {
  try {
    x.entries = h, x.mode = "picker", await st("picker"), ar();
  } catch (p) {
    Le(String(p));
  }
}
async function st(h) {
  const p = [], l = [];
  for (const w of x.entries) try {
    let E;
    h === "fsa" ? E = await Kn(w) : h === "dnd" ? E = await Qn(w) : E = await ta(w);
    const A = w.path.split("/")[0] ?? w.path, U = Math.floor(w.lastMtime / 1e3), W = await ua(E, w.path, U);
    p.push({ snap: W, account: A }), W.error && l.push(`[${w.path}] ${W.error}`);
  } catch (E) {
    l.push(`[${w.path}] ${String(E)}`);
  }
  if (p.length === 0) {
    Le("Failed to parse any files: " + l.join("; "));
    return;
  }
  const y = ca(p);
  x.snapshot = y, x.lastCheckedAt = Ee(), x.lastChangedAt = Ee(), ln(), nr(), l.length > 0 && Le(l.join(`
`));
}
function vt() {
  Et();
  const h = tn();
  h <= 0 || x.mode !== "fsa" || (x.pollTimerId = setTimeout(() => void Ba(), h * 1e3));
}
function Et() {
  x.pollTimerId !== null && (clearTimeout(x.pollTimerId), x.pollTimerId = null);
}
function Ua() {
  Et(), vt();
}
async function Ba() {
  x.lastCheckedAt = Ee(), nr(), await qn(x.entries) && (x.lastChangedAt = Ee(), await st("fsa")), vt();
}
async function Va() {
  x.entries.length !== 0 && (Et(), await st(x.mode), x.mode === "fsa" && vt());
}
function on(h) {
  x.currentTab = h, Ma(h), document.querySelectorAll(".tab").forEach((p) => {
    const l = p;
    l.classList.toggle("active", l.dataset.tab === h);
  }), Object.entries(an).forEach(([p, l]) => {
    l.classList.toggle("active", p === h), l.classList.toggle("hidden", p !== h);
  }), x.snapshot && ln();
}
function ln() {
  if (!x.snapshot) return;
  const h = x.currentTab, p = an[h];
  h === "characters" ? ga(x.snapshot, p) : h === "timers" ? wa(x.snapshot, p) : ya(x.snapshot, p);
}
function nr() {
  const h = Ee();
  Da.textContent = x.lastCheckedAt > 0 ? `Checked ${at(x.lastCheckedAt, h)}` : "\u2014", Na.textContent = x.lastChangedAt > 0 ? `Changed ${at(x.lastChangedAt, h)}` : "\u2014";
}
setInterval(nr, 1e4);
function yt() {
  rn.classList.remove("hidden"), nn.classList.add("hidden");
}
function ar() {
  rn.classList.add("hidden"), nn.classList.remove("hidden"), on(x.currentTab);
}
async function ja() {
  Et(), x.dirHandle = null, x.entries = [], x.snapshot = null, x.mode = "none", await ka(), yt();
}
function Le(h) {
  Qt.textContent = h, Qt.classList.remove("hidden"), setTimeout(() => Qt.classList.add("hidden"), 8e3);
}
Pa().catch(console.error);
const Ha = Object.freeze(Object.defineProperty({ __proto__: null }, Symbol.toStringTag, { value: "Module" }));
