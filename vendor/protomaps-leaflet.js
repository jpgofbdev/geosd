"use strict";
var protomapsL = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __pow = Math.pow;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step2(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step2(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step2 = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
      step2((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/@mapbox/point-geometry/index.js
  var require_point_geometry = __commonJS({
    "node_modules/@mapbox/point-geometry/index.js"(exports, module) {
      "use strict";
      module.exports = Point9;
      function Point9(x2, y) {
        this.x = x2;
        this.y = y;
      }
      Point9.prototype = {
        clone: function() {
          return new Point9(this.x, this.y);
        },
        add: function(p) {
          return this.clone()._add(p);
        },
        sub: function(p) {
          return this.clone()._sub(p);
        },
        multByPoint: function(p) {
          return this.clone()._multByPoint(p);
        },
        divByPoint: function(p) {
          return this.clone()._divByPoint(p);
        },
        mult: function(k) {
          return this.clone()._mult(k);
        },
        div: function(k) {
          return this.clone()._div(k);
        },
        rotate: function(a) {
          return this.clone()._rotate(a);
        },
        rotateAround: function(a, p) {
          return this.clone()._rotateAround(a, p);
        },
        matMult: function(m) {
          return this.clone()._matMult(m);
        },
        unit: function() {
          return this.clone()._unit();
        },
        perp: function() {
          return this.clone()._perp();
        },
        round: function() {
          return this.clone()._round();
        },
        mag: function() {
          return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        equals: function(other) {
          return this.x === other.x && this.y === other.y;
        },
        dist: function(p) {
          return Math.sqrt(this.distSqr(p));
        },
        distSqr: function(p) {
          var dx = p.x - this.x, dy = p.y - this.y;
          return dx * dx + dy * dy;
        },
        angle: function() {
          return Math.atan2(this.y, this.x);
        },
        angleTo: function(b) {
          return Math.atan2(this.y - b.y, this.x - b.x);
        },
        angleWith: function(b) {
          return this.angleWithSep(b.x, b.y);
        },
        angleWithSep: function(x2, y) {
          return Math.atan2(
            this.x * y - this.y * x2,
            this.x * x2 + this.y * y
          );
        },
        _matMult: function(m) {
          var x2 = m[0] * this.x + m[1] * this.y, y = m[2] * this.x + m[3] * this.y;
          this.x = x2;
          this.y = y;
          return this;
        },
        _add: function(p) {
          this.x += p.x;
          this.y += p.y;
          return this;
        },
        _sub: function(p) {
          this.x -= p.x;
          this.y -= p.y;
          return this;
        },
        _mult: function(k) {
          this.x *= k;
          this.y *= k;
          return this;
        },
        _div: function(k) {
          this.x /= k;
          this.y /= k;
          return this;
        },
        _multByPoint: function(p) {
          this.x *= p.x;
          this.y *= p.y;
          return this;
        },
        _divByPoint: function(p) {
          this.x /= p.x;
          this.y /= p.y;
          return this;
        },
        _unit: function() {
          this._div(this.mag());
          return this;
        },
        _perp: function() {
          var y = this.y;
          this.y = this.x;
          this.x = -y;
          return this;
        },
        _rotate: function(angle) {
          var cos = Math.cos(angle), sin = Math.sin(angle), x2 = cos * this.x - sin * this.y, y = sin * this.x + cos * this.y;
          this.x = x2;
          this.y = y;
          return this;
        },
        _rotateAround: function(angle, p) {
          var cos = Math.cos(angle), sin = Math.sin(angle), x2 = p.x + cos * (this.x - p.x) - sin * (this.y - p.y), y = p.y + sin * (this.x - p.x) + cos * (this.y - p.y);
          this.x = x2;
          this.y = y;
          return this;
        },
        _round: function() {
          this.x = Math.round(this.x);
          this.y = Math.round(this.y);
          return this;
        }
      };
      Point9.convert = function(a) {
        if (a instanceof Point9) {
          return a;
        }
        if (Array.isArray(a)) {
          return new Point9(a[0], a[1]);
        }
        return a;
      };
    }
  });

  // node_modules/@mapbox/unitbezier/index.js
  var require_unitbezier = __commonJS({
    "node_modules/@mapbox/unitbezier/index.js"(exports, module) {
      module.exports = UnitBezier2;
      function UnitBezier2(p1x, p1y, p2x, p2y) {
        this.cx = 3 * p1x;
        this.bx = 3 * (p2x - p1x) - this.cx;
        this.ax = 1 - this.cx - this.bx;
        this.cy = 3 * p1y;
        this.by = 3 * (p2y - p1y) - this.cy;
        this.ay = 1 - this.cy - this.by;
        this.p1x = p1x;
        this.p1y = p2y;
        this.p2x = p2x;
        this.p2y = p2y;
      }
      UnitBezier2.prototype.sampleCurveX = function(t) {
        return ((this.ax * t + this.bx) * t + this.cx) * t;
      };
      UnitBezier2.prototype.sampleCurveY = function(t) {
        return ((this.ay * t + this.by) * t + this.cy) * t;
      };
      UnitBezier2.prototype.sampleCurveDerivativeX = function(t) {
        return (3 * this.ax * t + 2 * this.bx) * t + this.cx;
      };
      UnitBezier2.prototype.solveCurveX = function(x2, epsilon) {
        if (typeof epsilon === "undefined")
          epsilon = 1e-6;
        var t0, t1, t2, x22, i2;
        for (t2 = x2, i2 = 0; i2 < 8; i2++) {
          x22 = this.sampleCurveX(t2) - x2;
          if (Math.abs(x22) < epsilon)
            return t2;
          var d2 = this.sampleCurveDerivativeX(t2);
          if (Math.abs(d2) < 1e-6)
            break;
          t2 = t2 - x22 / d2;
        }
        t0 = 0;
        t1 = 1;
        t2 = x2;
        if (t2 < t0)
          return t0;
        if (t2 > t1)
          return t1;
        while (t0 < t1) {
          x22 = this.sampleCurveX(t2);
          if (Math.abs(x22 - x2) < epsilon)
            return t2;
          if (x2 > x22) {
            t0 = t2;
          } else {
            t1 = t2;
          }
          t2 = (t1 - t0) * 0.5 + t0;
        }
        return t2;
      };
      UnitBezier2.prototype.solve = function(x2, epsilon) {
        return this.sampleCurveY(this.solveCurveX(x2, epsilon));
      };
    }
  });

  // node_modules/@mapbox/vector-tile/lib/vectortilefeature.js
  var require_vectortilefeature = __commonJS({
    "node_modules/@mapbox/vector-tile/lib/vectortilefeature.js"(exports, module) {
      "use strict";
      var Point9 = require_point_geometry();
      module.exports = VectorTileFeature;
      function VectorTileFeature(pbf, end, extent, keys, values) {
        this.properties = {};
        this.extent = extent;
        this.type = 0;
        this._pbf = pbf;
        this._geometry = -1;
        this._keys = keys;
        this._values = values;
        pbf.readFields(readFeature, this, end);
      }
      function readFeature(tag, feature, pbf) {
        if (tag == 1)
          feature.id = pbf.readVarint();
        else if (tag == 2)
          readTag(pbf, feature);
        else if (tag == 3)
          feature.type = pbf.readVarint();
        else if (tag == 4)
          feature._geometry = pbf.pos;
      }
      function readTag(pbf, feature) {
        var end = pbf.readVarint() + pbf.pos;
        while (pbf.pos < end) {
          var key = feature._keys[pbf.readVarint()], value = feature._values[pbf.readVarint()];
          feature.properties[key] = value;
        }
      }
      VectorTileFeature.types = ["Unknown", "Point", "LineString", "Polygon"];
      VectorTileFeature.prototype.loadGeometry = function() {
        var pbf = this._pbf;
        pbf.pos = this._geometry;
        var end = pbf.readVarint() + pbf.pos, cmd = 1, length = 0, x2 = 0, y = 0, lines = [], line;
        while (pbf.pos < end) {
          if (length <= 0) {
            var cmdLen = pbf.readVarint();
            cmd = cmdLen & 7;
            length = cmdLen >> 3;
          }
          length--;
          if (cmd === 1 || cmd === 2) {
            x2 += pbf.readSVarint();
            y += pbf.readSVarint();
            if (cmd === 1) {
              if (line)
                lines.push(line);
              line = [];
            }
            line.push(new Point9(x2, y));
          } else if (cmd === 7) {
            if (line) {
              line.push(line[0].clone());
            }
          } else {
            throw new Error("unknown command " + cmd);
          }
        }
        if (line)
          lines.push(line);
        return lines;
      };
      VectorTileFeature.prototype.bbox = function() {
        var pbf = this._pbf;
        pbf.pos = this._geometry;
        var end = pbf.readVarint() + pbf.pos, cmd = 1, length = 0, x2 = 0, y = 0, x1 = Infinity, x22 = -Infinity, y1 = Infinity, y2 = -Infinity;
        while (pbf.pos < end) {
          if (length <= 0) {
            var cmdLen = pbf.readVarint();
            cmd = cmdLen & 7;
            length = cmdLen >> 3;
          }
          length--;
          if (cmd === 1 || cmd === 2) {
            x2 += pbf.readSVarint();
            y += pbf.readSVarint();
            if (x2 < x1)
              x1 = x2;
            if (x2 > x22)
              x22 = x2;
            if (y < y1)
              y1 = y;
            if (y > y2)
              y2 = y;
          } else if (cmd !== 7) {
            throw new Error("unknown command " + cmd);
          }
        }
        return [x1, y1, x22, y2];
      };
      VectorTileFeature.prototype.toGeoJSON = function(x2, y, z) {
        var size = this.extent * Math.pow(2, z), x0 = this.extent * x2, y0 = this.extent * y, coords = this.loadGeometry(), type = VectorTileFeature.types[this.type], i2, j;
        function project2(line) {
          for (var j2 = 0; j2 < line.length; j2++) {
            var p = line[j2], y2 = 180 - (p.y + y0) * 360 / size;
            line[j2] = [
              (p.x + x0) * 360 / size - 180,
              360 / Math.PI * Math.atan(Math.exp(y2 * Math.PI / 180)) - 90
            ];
          }
        }
        switch (this.type) {
          case 1:
            var points = [];
            for (i2 = 0; i2 < coords.length; i2++) {
              points[i2] = coords[i2][0];
            }
            coords = points;
            project2(coords);
            break;
          case 2:
            for (i2 = 0; i2 < coords.length; i2++) {
              project2(coords[i2]);
            }
            break;
          case 3:
            coords = classifyRings(coords);
            for (i2 = 0; i2 < coords.length; i2++) {
              for (j = 0; j < coords[i2].length; j++) {
                project2(coords[i2][j]);
              }
            }
            break;
        }
        if (coords.length === 1) {
          coords = coords[0];
        } else {
          type = "Multi" + type;
        }
        var result = {
          type: "Feature",
          geometry: {
            type,
            coordinates: coords
          },
          properties: this.properties
        };
        if ("id" in this) {
          result.id = this.id;
        }
        return result;
      };
      function classifyRings(rings) {
        var len = rings.length;
        if (len <= 1)
          return [rings];
        var polygons = [], polygon, ccw;
        for (var i2 = 0; i2 < len; i2++) {
          var area = signedArea(rings[i2]);
          if (area === 0)
            continue;
          if (ccw === void 0)
            ccw = area < 0;
          if (ccw === area < 0) {
            if (polygon)
              polygons.push(polygon);
            polygon = [rings[i2]];
          } else {
            polygon.push(rings[i2]);
          }
        }
        if (polygon)
          polygons.push(polygon);
        return polygons;
      }
      function signedArea(ring) {
        var sum = 0;
        for (var i2 = 0, len = ring.length, j = len - 1, p1, p2; i2 < len; j = i2++) {
          p1 = ring[i2];
          p2 = ring[j];
          sum += (p2.x - p1.x) * (p1.y + p2.y);
        }
        return sum;
      }
    }
  });

  // node_modules/@mapbox/vector-tile/lib/vectortilelayer.js
  var require_vectortilelayer = __commonJS({
    "node_modules/@mapbox/vector-tile/lib/vectortilelayer.js"(exports, module) {
      "use strict";
      var VectorTileFeature = require_vectortilefeature();
      module.exports = VectorTileLayer;
      function VectorTileLayer(pbf, end) {
        this.version = 1;
        this.name = null;
        this.extent = 4096;
        this.length = 0;
        this._pbf = pbf;
        this._keys = [];
        this._values = [];
        this._features = [];
        pbf.readFields(readLayer, this, end);
        this.length = this._features.length;
      }
      function readLayer(tag, layer, pbf) {
        if (tag === 15)
          layer.version = pbf.readVarint();
        else if (tag === 1)
          layer.name = pbf.readString();
        else if (tag === 5)
          layer.extent = pbf.readVarint();
        else if (tag === 2)
          layer._features.push(pbf.pos);
        else if (tag === 3)
          layer._keys.push(pbf.readString());
        else if (tag === 4)
          layer._values.push(readValueMessage(pbf));
      }
      function readValueMessage(pbf) {
        var value = null, end = pbf.readVarint() + pbf.pos;
        while (pbf.pos < end) {
          var tag = pbf.readVarint() >> 3;
          value = tag === 1 ? pbf.readString() : tag === 2 ? pbf.readFloat() : tag === 3 ? pbf.readDouble() : tag === 4 ? pbf.readVarint64() : tag === 5 ? pbf.readVarint() : tag === 6 ? pbf.readSVarint() : tag === 7 ? pbf.readBoolean() : null;
        }
        return value;
      }
      VectorTileLayer.prototype.feature = function(i2) {
        if (i2 < 0 || i2 >= this._features.length)
          throw new Error("feature index out of bounds");
        this._pbf.pos = this._features[i2];
        var end = this._pbf.readVarint() + this._pbf.pos;
        return new VectorTileFeature(this._pbf, end, this.extent, this._keys, this._values);
      };
    }
  });

  // node_modules/@mapbox/vector-tile/lib/vectortile.js
  var require_vectortile = __commonJS({
    "node_modules/@mapbox/vector-tile/lib/vectortile.js"(exports, module) {
      "use strict";
      var VectorTileLayer = require_vectortilelayer();
      module.exports = VectorTile2;
      function VectorTile2(pbf, end) {
        this.layers = pbf.readFields(readTile, {}, end);
      }
      function readTile(tag, layers, pbf) {
        if (tag === 3) {
          var layer = new VectorTileLayer(pbf, pbf.readVarint() + pbf.pos);
          if (layer.length)
            layers[layer.name] = layer;
        }
      }
    }
  });

  // node_modules/@mapbox/vector-tile/index.js
  var require_vector_tile = __commonJS({
    "node_modules/@mapbox/vector-tile/index.js"(exports, module) {
      module.exports.VectorTile = require_vectortile();
      module.exports.VectorTileFeature = require_vectortilefeature();
      module.exports.VectorTileLayer = require_vectortilelayer();
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i2 = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i2];
        i2 += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i2], i2 += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i2], i2 += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i2 = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i2] = m & 255, i2 += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i2] = e & 255, i2 += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i2 - d] |= s * 128;
      };
    }
  });

  // node_modules/pbf/index.js
  var require_pbf = __commonJS({
    "node_modules/pbf/index.js"(exports, module) {
      "use strict";
      module.exports = Pbf;
      var ieee754 = require_ieee754();
      function Pbf(buf) {
        this.buf = ArrayBuffer.isView && ArrayBuffer.isView(buf) ? buf : new Uint8Array(buf || 0);
        this.pos = 0;
        this.type = 0;
        this.length = this.buf.length;
      }
      Pbf.Varint = 0;
      Pbf.Fixed64 = 1;
      Pbf.Bytes = 2;
      Pbf.Fixed32 = 5;
      var SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
      var SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
      var TEXT_DECODER_MIN_LENGTH = 12;
      var utf8TextDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder("utf8");
      Pbf.prototype = {
        destroy: function() {
          this.buf = null;
        },
        readFields: function(readField, result, end) {
          end = end || this.length;
          while (this.pos < end) {
            var val = this.readVarint(), tag = val >> 3, startPos = this.pos;
            this.type = val & 7;
            readField(tag, result, this);
            if (this.pos === startPos)
              this.skip(val);
          }
          return result;
        },
        readMessage: function(readField, result) {
          return this.readFields(readField, result, this.readVarint() + this.pos);
        },
        readFixed32: function() {
          var val = readUInt32(this.buf, this.pos);
          this.pos += 4;
          return val;
        },
        readSFixed32: function() {
          var val = readInt32(this.buf, this.pos);
          this.pos += 4;
          return val;
        },
        readFixed64: function() {
          var val = readUInt32(this.buf, this.pos) + readUInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
          this.pos += 8;
          return val;
        },
        readSFixed64: function() {
          var val = readUInt32(this.buf, this.pos) + readInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
          this.pos += 8;
          return val;
        },
        readFloat: function() {
          var val = ieee754.read(this.buf, this.pos, true, 23, 4);
          this.pos += 4;
          return val;
        },
        readDouble: function() {
          var val = ieee754.read(this.buf, this.pos, true, 52, 8);
          this.pos += 8;
          return val;
        },
        readVarint: function(isSigned) {
          var buf = this.buf, val, b;
          b = buf[this.pos++];
          val = b & 127;
          if (b < 128)
            return val;
          b = buf[this.pos++];
          val |= (b & 127) << 7;
          if (b < 128)
            return val;
          b = buf[this.pos++];
          val |= (b & 127) << 14;
          if (b < 128)
            return val;
          b = buf[this.pos++];
          val |= (b & 127) << 21;
          if (b < 128)
            return val;
          b = buf[this.pos];
          val |= (b & 15) << 28;
          return readVarintRemainder2(val, isSigned, this);
        },
        readVarint64: function() {
          return this.readVarint(true);
        },
        readSVarint: function() {
          var num = this.readVarint();
          return num % 2 === 1 ? (num + 1) / -2 : num / 2;
        },
        readBoolean: function() {
          return Boolean(this.readVarint());
        },
        readString: function() {
          var end = this.readVarint() + this.pos;
          var pos = this.pos;
          this.pos = end;
          if (end - pos >= TEXT_DECODER_MIN_LENGTH && utf8TextDecoder) {
            return readUtf8TextDecoder(this.buf, pos, end);
          }
          return readUtf8(this.buf, pos, end);
        },
        readBytes: function() {
          var end = this.readVarint() + this.pos, buffer = this.buf.subarray(this.pos, end);
          this.pos = end;
          return buffer;
        },
        readPackedVarint: function(arr2, isSigned) {
          if (this.type !== Pbf.Bytes)
            return arr2.push(this.readVarint(isSigned));
          var end = readPackedEnd(this);
          arr2 = arr2 || [];
          while (this.pos < end)
            arr2.push(this.readVarint(isSigned));
          return arr2;
        },
        readPackedSVarint: function(arr2) {
          if (this.type !== Pbf.Bytes)
            return arr2.push(this.readSVarint());
          var end = readPackedEnd(this);
          arr2 = arr2 || [];
          while (this.pos < end)
            arr2.push(this.readSVarint());
          return arr2;
        },
        readPackedBoolean: function(arr2) {
          if (this.type !== Pbf.Bytes)
            return arr2.push(this.readBoolean());
          var end = readPackedEnd(this);
          arr2 = arr2 || [];
          while (this.pos < end)
            arr2.push(this.readBoolean());
          return arr2;
        },
        readPackedFloat: function(arr2) {
          if (this.type !== Pbf.Bytes)
            return arr2.push(this.readFloat());
          var end = readPackedEnd(this);
          arr2 = arr2 || [];
          while (this.pos < end)
            arr2.push(this.readFloat());
          return arr2;
        },
        readPackedDouble: function(arr2) {
          if (this.type !== Pbf.Bytes)
            return arr2.push(this.readDouble());
          var end = readPackedEnd(this);
          arr2 = arr2 || [];
          while (this.pos < end)
            arr2.push(this.readDouble());
          return arr2;
        },
        readPackedFixed32: function(arr2) {
          if (this.type !== Pbf.Bytes)
            return arr2.push(this.readFixed32());
          var end = readPackedEnd(this);
          arr2 = arr2 || [];
          while (this.pos < end)
            arr2.push(this.readFixed32());
          return arr2;
        },
        readPackedSFixed32: function(arr2) {
          if (this.type !== Pbf.Bytes)
            return arr2.push(this.readSFixed32());
          var end = readPackedEnd(this);
          arr2 = arr2 || [];
          while (this.pos < end)
            arr2.push(this.readSFixed32());
          return arr2;
        },
        readPackedFixed64: function(arr2) {
          if (this.type !== Pbf.Bytes)
            return arr2.push(this.readFixed64());
          var end = readPackedEnd(this);
          arr2 = arr2 || [];
          while (this.pos < end)
            arr2.push(this.readFixed64());
          return arr2;
        },
        readPackedSFixed64: function(arr2) {
          if (this.type !== Pbf.Bytes)
            return arr2.push(this.readSFixed64());
          var end = readPackedEnd(this);
          arr2 = arr2 || [];
          while (this.pos < end)
            arr2.push(this.readSFixed64());
          return arr2;
        },
        skip: function(val) {
          var type = val & 7;
          if (type === Pbf.Varint)
            while (this.buf[this.pos++] > 127) {
            }
          else if (type === Pbf.Bytes)
            this.pos = this.readVarint() + this.pos;
          else if (type === Pbf.Fixed32)
            this.pos += 4;
          else if (type === Pbf.Fixed64)
            this.pos += 8;
          else
            throw new Error("Unimplemented type: " + type);
        },
        writeTag: function(tag, type) {
          this.writeVarint(tag << 3 | type);
        },
        realloc: function(min) {
          var length = this.length || 16;
          while (length < this.pos + min)
            length *= 2;
          if (length !== this.length) {
            var buf = new Uint8Array(length);
            buf.set(this.buf);
            this.buf = buf;
            this.length = length;
          }
        },
        finish: function() {
          this.length = this.pos;
          this.pos = 0;
          return this.buf.subarray(0, this.length);
        },
        writeFixed32: function(val) {
          this.realloc(4);
          writeInt32(this.buf, val, this.pos);
          this.pos += 4;
        },
        writeSFixed32: function(val) {
          this.realloc(4);
          writeInt32(this.buf, val, this.pos);
          this.pos += 4;
        },
        writeFixed64: function(val) {
          this.realloc(8);
          writeInt32(this.buf, val & -1, this.pos);
          writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
          this.pos += 8;
        },
        writeSFixed64: function(val) {
          this.realloc(8);
          writeInt32(this.buf, val & -1, this.pos);
          writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
          this.pos += 8;
        },
        writeVarint: function(val) {
          val = +val || 0;
          if (val > 268435455 || val < 0) {
            writeBigVarint(val, this);
            return;
          }
          this.realloc(4);
          this.buf[this.pos++] = val & 127 | (val > 127 ? 128 : 0);
          if (val <= 127)
            return;
          this.buf[this.pos++] = (val >>>= 7) & 127 | (val > 127 ? 128 : 0);
          if (val <= 127)
            return;
          this.buf[this.pos++] = (val >>>= 7) & 127 | (val > 127 ? 128 : 0);
          if (val <= 127)
            return;
          this.buf[this.pos++] = val >>> 7 & 127;
        },
        writeSVarint: function(val) {
          this.writeVarint(val < 0 ? -val * 2 - 1 : val * 2);
        },
        writeBoolean: function(val) {
          this.writeVarint(Boolean(val));
        },
        writeString: function(str) {
          str = String(str);
          this.realloc(str.length * 4);
          this.pos++;
          var startPos = this.pos;
          this.pos = writeUtf8(this.buf, str, this.pos);
          var len = this.pos - startPos;
          if (len >= 128)
            makeRoomForExtraLength(startPos, len, this);
          this.pos = startPos - 1;
          this.writeVarint(len);
          this.pos += len;
        },
        writeFloat: function(val) {
          this.realloc(4);
          ieee754.write(this.buf, val, this.pos, true, 23, 4);
          this.pos += 4;
        },
        writeDouble: function(val) {
          this.realloc(8);
          ieee754.write(this.buf, val, this.pos, true, 52, 8);
          this.pos += 8;
        },
        writeBytes: function(buffer) {
          var len = buffer.length;
          this.writeVarint(len);
          this.realloc(len);
          for (var i2 = 0; i2 < len; i2++)
            this.buf[this.pos++] = buffer[i2];
        },
        writeRawMessage: function(fn, obj) {
          this.pos++;
          var startPos = this.pos;
          fn(obj, this);
          var len = this.pos - startPos;
          if (len >= 128)
            makeRoomForExtraLength(startPos, len, this);
          this.pos = startPos - 1;
          this.writeVarint(len);
          this.pos += len;
        },
        writeMessage: function(tag, fn, obj) {
          this.writeTag(tag, Pbf.Bytes);
          this.writeRawMessage(fn, obj);
        },
        writePackedVarint: function(tag, arr2) {
          if (arr2.length)
            this.writeMessage(tag, writePackedVarint, arr2);
        },
        writePackedSVarint: function(tag, arr2) {
          if (arr2.length)
            this.writeMessage(tag, writePackedSVarint, arr2);
        },
        writePackedBoolean: function(tag, arr2) {
          if (arr2.length)
            this.writeMessage(tag, writePackedBoolean, arr2);
        },
        writePackedFloat: function(tag, arr2) {
          if (arr2.length)
            this.writeMessage(tag, writePackedFloat, arr2);
        },
        writePackedDouble: function(tag, arr2) {
          if (arr2.length)
            this.writeMessage(tag, writePackedDouble, arr2);
        },
        writePackedFixed32: function(tag, arr2) {
          if (arr2.length)
            this.writeMessage(tag, writePackedFixed32, arr2);
        },
        writePackedSFixed32: function(tag, arr2) {
          if (arr2.length)
            this.writeMessage(tag, writePackedSFixed32, arr2);
        },
        writePackedFixed64: function(tag, arr2) {
          if (arr2.length)
            this.writeMessage(tag, writePackedFixed64, arr2);
        },
        writePackedSFixed64: function(tag, arr2) {
          if (arr2.length)
            this.writeMessage(tag, writePackedSFixed64, arr2);
        },
        writeBytesField: function(tag, buffer) {
          this.writeTag(tag, Pbf.Bytes);
          this.writeBytes(buffer);
        },
        writeFixed32Field: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed32);
          this.writeFixed32(val);
        },
        writeSFixed32Field: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed32);
          this.writeSFixed32(val);
        },
        writeFixed64Field: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed64);
          this.writeFixed64(val);
        },
        writeSFixed64Field: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed64);
          this.writeSFixed64(val);
        },
        writeVarintField: function(tag, val) {
          this.writeTag(tag, Pbf.Varint);
          this.writeVarint(val);
        },
        writeSVarintField: function(tag, val) {
          this.writeTag(tag, Pbf.Varint);
          this.writeSVarint(val);
        },
        writeStringField: function(tag, str) {
          this.writeTag(tag, Pbf.Bytes);
          this.writeString(str);
        },
        writeFloatField: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed32);
          this.writeFloat(val);
        },
        writeDoubleField: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed64);
          this.writeDouble(val);
        },
        writeBooleanField: function(tag, val) {
          this.writeVarintField(tag, Boolean(val));
        }
      };
      function readVarintRemainder2(l, s, p) {
        var buf = p.buf, h, b;
        b = buf[p.pos++];
        h = (b & 112) >> 4;
        if (b < 128)
          return toNum2(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 3;
        if (b < 128)
          return toNum2(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 10;
        if (b < 128)
          return toNum2(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 17;
        if (b < 128)
          return toNum2(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 24;
        if (b < 128)
          return toNum2(l, h, s);
        b = buf[p.pos++];
        h |= (b & 1) << 31;
        if (b < 128)
          return toNum2(l, h, s);
        throw new Error("Expected varint not more than 10 bytes");
      }
      function readPackedEnd(pbf) {
        return pbf.type === Pbf.Bytes ? pbf.readVarint() + pbf.pos : pbf.pos + 1;
      }
      function toNum2(low, high, isSigned) {
        if (isSigned) {
          return high * 4294967296 + (low >>> 0);
        }
        return (high >>> 0) * 4294967296 + (low >>> 0);
      }
      function writeBigVarint(val, pbf) {
        var low, high;
        if (val >= 0) {
          low = val % 4294967296 | 0;
          high = val / 4294967296 | 0;
        } else {
          low = ~(-val % 4294967296);
          high = ~(-val / 4294967296);
          if (low ^ 4294967295) {
            low = low + 1 | 0;
          } else {
            low = 0;
            high = high + 1 | 0;
          }
        }
        if (val >= 18446744073709552e3 || val < -18446744073709552e3) {
          throw new Error("Given varint doesn't fit into 10 bytes");
        }
        pbf.realloc(10);
        writeBigVarintLow(low, high, pbf);
        writeBigVarintHigh(high, pbf);
      }
      function writeBigVarintLow(low, high, pbf) {
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos] = low & 127;
      }
      function writeBigVarintHigh(high, pbf) {
        var lsb = (high & 7) << 4;
        pbf.buf[pbf.pos++] |= lsb | ((high >>>= 3) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127;
      }
      function makeRoomForExtraLength(startPos, len, pbf) {
        var extraLen = len <= 16383 ? 1 : len <= 2097151 ? 2 : len <= 268435455 ? 3 : Math.floor(Math.log(len) / (Math.LN2 * 7));
        pbf.realloc(extraLen);
        for (var i2 = pbf.pos - 1; i2 >= startPos; i2--)
          pbf.buf[i2 + extraLen] = pbf.buf[i2];
      }
      function writePackedVarint(arr2, pbf) {
        for (var i2 = 0; i2 < arr2.length; i2++)
          pbf.writeVarint(arr2[i2]);
      }
      function writePackedSVarint(arr2, pbf) {
        for (var i2 = 0; i2 < arr2.length; i2++)
          pbf.writeSVarint(arr2[i2]);
      }
      function writePackedFloat(arr2, pbf) {
        for (var i2 = 0; i2 < arr2.length; i2++)
          pbf.writeFloat(arr2[i2]);
      }
      function writePackedDouble(arr2, pbf) {
        for (var i2 = 0; i2 < arr2.length; i2++)
          pbf.writeDouble(arr2[i2]);
      }
      function writePackedBoolean(arr2, pbf) {
        for (var i2 = 0; i2 < arr2.length; i2++)
          pbf.writeBoolean(arr2[i2]);
      }
      function writePackedFixed32(arr2, pbf) {
        for (var i2 = 0; i2 < arr2.length; i2++)
          pbf.writeFixed32(arr2[i2]);
      }
      function writePackedSFixed32(arr2, pbf) {
        for (var i2 = 0; i2 < arr2.length; i2++)
          pbf.writeSFixed32(arr2[i2]);
      }
      function writePackedFixed64(arr2, pbf) {
        for (var i2 = 0; i2 < arr2.length; i2++)
          pbf.writeFixed64(arr2[i2]);
      }
      function writePackedSFixed64(arr2, pbf) {
        for (var i2 = 0; i2 < arr2.length; i2++)
          pbf.writeSFixed64(arr2[i2]);
      }
      function readUInt32(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16) + buf[pos + 3] * 16777216;
      }
      function writeInt32(buf, val, pos) {
        buf[pos] = val;
        buf[pos + 1] = val >>> 8;
        buf[pos + 2] = val >>> 16;
        buf[pos + 3] = val >>> 24;
      }
      function readInt32(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16) + (buf[pos + 3] << 24);
      }
      function readUtf8(buf, pos, end) {
        var str = "";
        var i2 = pos;
        while (i2 < end) {
          var b0 = buf[i2];
          var c = null;
          var bytesPerSequence = b0 > 239 ? 4 : b0 > 223 ? 3 : b0 > 191 ? 2 : 1;
          if (i2 + bytesPerSequence > end)
            break;
          var b1, b2, b3;
          if (bytesPerSequence === 1) {
            if (b0 < 128) {
              c = b0;
            }
          } else if (bytesPerSequence === 2) {
            b1 = buf[i2 + 1];
            if ((b1 & 192) === 128) {
              c = (b0 & 31) << 6 | b1 & 63;
              if (c <= 127) {
                c = null;
              }
            }
          } else if (bytesPerSequence === 3) {
            b1 = buf[i2 + 1];
            b2 = buf[i2 + 2];
            if ((b1 & 192) === 128 && (b2 & 192) === 128) {
              c = (b0 & 15) << 12 | (b1 & 63) << 6 | b2 & 63;
              if (c <= 2047 || c >= 55296 && c <= 57343) {
                c = null;
              }
            }
          } else if (bytesPerSequence === 4) {
            b1 = buf[i2 + 1];
            b2 = buf[i2 + 2];
            b3 = buf[i2 + 3];
            if ((b1 & 192) === 128 && (b2 & 192) === 128 && (b3 & 192) === 128) {
              c = (b0 & 15) << 18 | (b1 & 63) << 12 | (b2 & 63) << 6 | b3 & 63;
              if (c <= 65535 || c >= 1114112) {
                c = null;
              }
            }
          }
          if (c === null) {
            c = 65533;
            bytesPerSequence = 1;
          } else if (c > 65535) {
            c -= 65536;
            str += String.fromCharCode(c >>> 10 & 1023 | 55296);
            c = 56320 | c & 1023;
          }
          str += String.fromCharCode(c);
          i2 += bytesPerSequence;
        }
        return str;
      }
      function readUtf8TextDecoder(buf, pos, end) {
        return utf8TextDecoder.decode(buf.subarray(pos, end));
      }
      function writeUtf8(buf, str, pos) {
        for (var i2 = 0, c, lead; i2 < str.length; i2++) {
          c = str.charCodeAt(i2);
          if (c > 55295 && c < 57344) {
            if (lead) {
              if (c < 56320) {
                buf[pos++] = 239;
                buf[pos++] = 191;
                buf[pos++] = 189;
                lead = c;
                continue;
              } else {
                c = lead - 55296 << 10 | c - 56320 | 65536;
                lead = null;
              }
            } else {
              if (c > 56319 || i2 + 1 === str.length) {
                buf[pos++] = 239;
                buf[pos++] = 191;
                buf[pos++] = 189;
              } else {
                lead = c;
              }
              continue;
            }
          } else if (lead) {
            buf[pos++] = 239;
            buf[pos++] = 191;
            buf[pos++] = 189;
            lead = null;
          }
          if (c < 128) {
            buf[pos++] = c;
          } else {
            if (c < 2048) {
              buf[pos++] = c >> 6 | 192;
            } else {
              if (c < 65536) {
                buf[pos++] = c >> 12 | 224;
              } else {
                buf[pos++] = c >> 18 | 240;
                buf[pos++] = c >> 12 & 63 | 128;
              }
              buf[pos++] = c >> 6 & 63 | 128;
            }
            buf[pos++] = c & 63 | 128;
          }
        }
        return pos;
      }
    }
  });

  // node_modules/rbush/rbush.min.js
  var require_rbush_min = __commonJS({
    "node_modules/rbush/rbush.min.js"(exports, module) {
      !function(t, i2) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = i2() : "function" == typeof define && define.amd ? define(i2) : (t = t || self).RBush = i2();
      }(exports, function() {
        "use strict";
        function t(t2, r3, e2, a2, h2) {
          !function t3(n2, r4, e3, a3, h3) {
            for (; a3 > e3; ) {
              if (a3 - e3 > 600) {
                var o2 = a3 - e3 + 1, s2 = r4 - e3 + 1, l2 = Math.log(o2), f2 = 0.5 * Math.exp(2 * l2 / 3), u2 = 0.5 * Math.sqrt(l2 * f2 * (o2 - f2) / o2) * (s2 - o2 / 2 < 0 ? -1 : 1), m2 = Math.max(e3, Math.floor(r4 - s2 * f2 / o2 + u2)), c2 = Math.min(a3, Math.floor(r4 + (o2 - s2) * f2 / o2 + u2));
                t3(n2, r4, m2, c2, h3);
              }
              var p2 = n2[r4], d2 = e3, x2 = a3;
              for (i2(n2, e3, r4), h3(n2[a3], p2) > 0 && i2(n2, e3, a3); d2 < x2; ) {
                for (i2(n2, d2, x2), d2++, x2--; h3(n2[d2], p2) < 0; )
                  d2++;
                for (; h3(n2[x2], p2) > 0; )
                  x2--;
              }
              0 === h3(n2[e3], p2) ? i2(n2, e3, x2) : i2(n2, ++x2, a3), x2 <= r4 && (e3 = x2 + 1), r4 <= x2 && (a3 = x2 - 1);
            }
          }(t2, r3, e2 || 0, a2 || t2.length - 1, h2 || n);
        }
        function i2(t2, i3, n2) {
          var r3 = t2[i3];
          t2[i3] = t2[n2], t2[n2] = r3;
        }
        function n(t2, i3) {
          return t2 < i3 ? -1 : t2 > i3 ? 1 : 0;
        }
        var r2 = function(t2) {
          void 0 === t2 && (t2 = 9), this._maxEntries = Math.max(4, t2), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
        };
        function e(t2, i3, n2) {
          if (!n2)
            return i3.indexOf(t2);
          for (var r3 = 0; r3 < i3.length; r3++)
            if (n2(t2, i3[r3]))
              return r3;
          return -1;
        }
        function a(t2, i3) {
          h(t2, 0, t2.children.length, i3, t2);
        }
        function h(t2, i3, n2, r3, e2) {
          e2 || (e2 = p(null)), e2.minX = 1 / 0, e2.minY = 1 / 0, e2.maxX = -1 / 0, e2.maxY = -1 / 0;
          for (var a2 = i3; a2 < n2; a2++) {
            var h2 = t2.children[a2];
            o(e2, t2.leaf ? r3(h2) : h2);
          }
          return e2;
        }
        function o(t2, i3) {
          return t2.minX = Math.min(t2.minX, i3.minX), t2.minY = Math.min(t2.minY, i3.minY), t2.maxX = Math.max(t2.maxX, i3.maxX), t2.maxY = Math.max(t2.maxY, i3.maxY), t2;
        }
        function s(t2, i3) {
          return t2.minX - i3.minX;
        }
        function l(t2, i3) {
          return t2.minY - i3.minY;
        }
        function f(t2) {
          return (t2.maxX - t2.minX) * (t2.maxY - t2.minY);
        }
        function u(t2) {
          return t2.maxX - t2.minX + (t2.maxY - t2.minY);
        }
        function m(t2, i3) {
          return t2.minX <= i3.minX && t2.minY <= i3.minY && i3.maxX <= t2.maxX && i3.maxY <= t2.maxY;
        }
        function c(t2, i3) {
          return i3.minX <= t2.maxX && i3.minY <= t2.maxY && i3.maxX >= t2.minX && i3.maxY >= t2.minY;
        }
        function p(t2) {
          return { children: t2, height: 1, leaf: true, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
        }
        function d(i3, n2, r3, e2, a2) {
          for (var h2 = [n2, r3]; h2.length; )
            if (!((r3 = h2.pop()) - (n2 = h2.pop()) <= e2)) {
              var o2 = n2 + Math.ceil((r3 - n2) / e2 / 2) * e2;
              t(i3, o2, n2, r3, a2), h2.push(n2, o2, o2, r3);
            }
        }
        return r2.prototype.all = function() {
          return this._all(this.data, []);
        }, r2.prototype.search = function(t2) {
          var i3 = this.data, n2 = [];
          if (!c(t2, i3))
            return n2;
          for (var r3 = this.toBBox, e2 = []; i3; ) {
            for (var a2 = 0; a2 < i3.children.length; a2++) {
              var h2 = i3.children[a2], o2 = i3.leaf ? r3(h2) : h2;
              c(t2, o2) && (i3.leaf ? n2.push(h2) : m(t2, o2) ? this._all(h2, n2) : e2.push(h2));
            }
            i3 = e2.pop();
          }
          return n2;
        }, r2.prototype.collides = function(t2) {
          var i3 = this.data;
          if (!c(t2, i3))
            return false;
          for (var n2 = []; i3; ) {
            for (var r3 = 0; r3 < i3.children.length; r3++) {
              var e2 = i3.children[r3], a2 = i3.leaf ? this.toBBox(e2) : e2;
              if (c(t2, a2)) {
                if (i3.leaf || m(t2, a2))
                  return true;
                n2.push(e2);
              }
            }
            i3 = n2.pop();
          }
          return false;
        }, r2.prototype.load = function(t2) {
          if (!t2 || !t2.length)
            return this;
          if (t2.length < this._minEntries) {
            for (var i3 = 0; i3 < t2.length; i3++)
              this.insert(t2[i3]);
            return this;
          }
          var n2 = this._build(t2.slice(), 0, t2.length - 1, 0);
          if (this.data.children.length)
            if (this.data.height === n2.height)
              this._splitRoot(this.data, n2);
            else {
              if (this.data.height < n2.height) {
                var r3 = this.data;
                this.data = n2, n2 = r3;
              }
              this._insert(n2, this.data.height - n2.height - 1, true);
            }
          else
            this.data = n2;
          return this;
        }, r2.prototype.insert = function(t2) {
          return t2 && this._insert(t2, this.data.height - 1), this;
        }, r2.prototype.clear = function() {
          return this.data = p([]), this;
        }, r2.prototype.remove = function(t2, i3) {
          if (!t2)
            return this;
          for (var n2, r3, a2, h2 = this.data, o2 = this.toBBox(t2), s2 = [], l2 = []; h2 || s2.length; ) {
            if (h2 || (h2 = s2.pop(), r3 = s2[s2.length - 1], n2 = l2.pop(), a2 = true), h2.leaf) {
              var f2 = e(t2, h2.children, i3);
              if (-1 !== f2)
                return h2.children.splice(f2, 1), s2.push(h2), this._condense(s2), this;
            }
            a2 || h2.leaf || !m(h2, o2) ? r3 ? (n2++, h2 = r3.children[n2], a2 = false) : h2 = null : (s2.push(h2), l2.push(n2), n2 = 0, r3 = h2, h2 = h2.children[0]);
          }
          return this;
        }, r2.prototype.toBBox = function(t2) {
          return t2;
        }, r2.prototype.compareMinX = function(t2, i3) {
          return t2.minX - i3.minX;
        }, r2.prototype.compareMinY = function(t2, i3) {
          return t2.minY - i3.minY;
        }, r2.prototype.toJSON = function() {
          return this.data;
        }, r2.prototype.fromJSON = function(t2) {
          return this.data = t2, this;
        }, r2.prototype._all = function(t2, i3) {
          for (var n2 = []; t2; )
            t2.leaf ? i3.push.apply(i3, t2.children) : n2.push.apply(n2, t2.children), t2 = n2.pop();
          return i3;
        }, r2.prototype._build = function(t2, i3, n2, r3) {
          var e2, h2 = n2 - i3 + 1, o2 = this._maxEntries;
          if (h2 <= o2)
            return a(e2 = p(t2.slice(i3, n2 + 1)), this.toBBox), e2;
          r3 || (r3 = Math.ceil(Math.log(h2) / Math.log(o2)), o2 = Math.ceil(h2 / Math.pow(o2, r3 - 1))), (e2 = p([])).leaf = false, e2.height = r3;
          var s2 = Math.ceil(h2 / o2), l2 = s2 * Math.ceil(Math.sqrt(o2));
          d(t2, i3, n2, l2, this.compareMinX);
          for (var f2 = i3; f2 <= n2; f2 += l2) {
            var u2 = Math.min(f2 + l2 - 1, n2);
            d(t2, f2, u2, s2, this.compareMinY);
            for (var m2 = f2; m2 <= u2; m2 += s2) {
              var c2 = Math.min(m2 + s2 - 1, u2);
              e2.children.push(this._build(t2, m2, c2, r3 - 1));
            }
          }
          return a(e2, this.toBBox), e2;
        }, r2.prototype._chooseSubtree = function(t2, i3, n2, r3) {
          for (; r3.push(i3), !i3.leaf && r3.length - 1 !== n2; ) {
            for (var e2 = 1 / 0, a2 = 1 / 0, h2 = void 0, o2 = 0; o2 < i3.children.length; o2++) {
              var s2 = i3.children[o2], l2 = f(s2), u2 = (m2 = t2, c2 = s2, (Math.max(c2.maxX, m2.maxX) - Math.min(c2.minX, m2.minX)) * (Math.max(c2.maxY, m2.maxY) - Math.min(c2.minY, m2.minY)) - l2);
              u2 < a2 ? (a2 = u2, e2 = l2 < e2 ? l2 : e2, h2 = s2) : u2 === a2 && l2 < e2 && (e2 = l2, h2 = s2);
            }
            i3 = h2 || i3.children[0];
          }
          var m2, c2;
          return i3;
        }, r2.prototype._insert = function(t2, i3, n2) {
          var r3 = n2 ? t2 : this.toBBox(t2), e2 = [], a2 = this._chooseSubtree(r3, this.data, i3, e2);
          for (a2.children.push(t2), o(a2, r3); i3 >= 0 && e2[i3].children.length > this._maxEntries; )
            this._split(e2, i3), i3--;
          this._adjustParentBBoxes(r3, e2, i3);
        }, r2.prototype._split = function(t2, i3) {
          var n2 = t2[i3], r3 = n2.children.length, e2 = this._minEntries;
          this._chooseSplitAxis(n2, e2, r3);
          var h2 = this._chooseSplitIndex(n2, e2, r3), o2 = p(n2.children.splice(h2, n2.children.length - h2));
          o2.height = n2.height, o2.leaf = n2.leaf, a(n2, this.toBBox), a(o2, this.toBBox), i3 ? t2[i3 - 1].children.push(o2) : this._splitRoot(n2, o2);
        }, r2.prototype._splitRoot = function(t2, i3) {
          this.data = p([t2, i3]), this.data.height = t2.height + 1, this.data.leaf = false, a(this.data, this.toBBox);
        }, r2.prototype._chooseSplitIndex = function(t2, i3, n2) {
          for (var r3, e2, a2, o2, s2, l2, u2, m2 = 1 / 0, c2 = 1 / 0, p2 = i3; p2 <= n2 - i3; p2++) {
            var d2 = h(t2, 0, p2, this.toBBox), x2 = h(t2, p2, n2, this.toBBox), v = (e2 = d2, a2 = x2, o2 = void 0, s2 = void 0, l2 = void 0, u2 = void 0, o2 = Math.max(e2.minX, a2.minX), s2 = Math.max(e2.minY, a2.minY), l2 = Math.min(e2.maxX, a2.maxX), u2 = Math.min(e2.maxY, a2.maxY), Math.max(0, l2 - o2) * Math.max(0, u2 - s2)), M = f(d2) + f(x2);
            v < m2 ? (m2 = v, r3 = p2, c2 = M < c2 ? M : c2) : v === m2 && M < c2 && (c2 = M, r3 = p2);
          }
          return r3 || n2 - i3;
        }, r2.prototype._chooseSplitAxis = function(t2, i3, n2) {
          var r3 = t2.leaf ? this.compareMinX : s, e2 = t2.leaf ? this.compareMinY : l;
          this._allDistMargin(t2, i3, n2, r3) < this._allDistMargin(t2, i3, n2, e2) && t2.children.sort(r3);
        }, r2.prototype._allDistMargin = function(t2, i3, n2, r3) {
          t2.children.sort(r3);
          for (var e2 = this.toBBox, a2 = h(t2, 0, i3, e2), s2 = h(t2, n2 - i3, n2, e2), l2 = u(a2) + u(s2), f2 = i3; f2 < n2 - i3; f2++) {
            var m2 = t2.children[f2];
            o(a2, t2.leaf ? e2(m2) : m2), l2 += u(a2);
          }
          for (var c2 = n2 - i3 - 1; c2 >= i3; c2--) {
            var p2 = t2.children[c2];
            o(s2, t2.leaf ? e2(p2) : p2), l2 += u(s2);
          }
          return l2;
        }, r2.prototype._adjustParentBBoxes = function(t2, i3, n2) {
          for (var r3 = n2; r3 >= 0; r3--)
            o(i3[r3], t2);
        }, r2.prototype._condense = function(t2) {
          for (var i3 = t2.length - 1, n2 = void 0; i3 >= 0; i3--)
            0 === t2[i3].children.length ? i3 > 0 ? (n2 = t2[i3 - 1].children).splice(n2.indexOf(t2[i3]), 1) : this.clear() : a(t2[i3], this.toBBox);
        }, r2;
      });
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    CenteredSymbolizer: () => CenteredSymbolizer,
    CenteredTextSymbolizer: () => CenteredTextSymbolizer,
    CircleSymbolizer: () => CircleSymbolizer,
    FlexSymbolizer: () => FlexSymbolizer,
    Font: () => Font,
    GeomType: () => GeomType,
    GroupSymbolizer: () => GroupSymbolizer,
    IconSymbolizer: () => IconSymbolizer,
    Index: () => Index,
    Justify: () => Justify,
    Labeler: () => Labeler,
    Labelers: () => Labelers,
    LineLabelPlacement: () => LineLabelPlacement,
    LineLabelSymbolizer: () => LineLabelSymbolizer,
    LineSymbolizer: () => LineSymbolizer,
    OffsetSymbolizer: () => OffsetSymbolizer,
    OffsetTextSymbolizer: () => OffsetTextSymbolizer,
    PMTiles: () => PMTiles,
    Padding: () => Padding,
    PmtilesSource: () => PmtilesSource,
    PolygonSymbolizer: () => PolygonSymbolizer,
    Sheet: () => Sheet,
    ShieldSymbolizer: () => ShieldSymbolizer,
    Static: () => Static,
    TextPlacements: () => TextPlacements,
    TextSymbolizer: () => TextSymbolizer,
    TileCache: () => TileCache,
    View: () => View,
    ZxySource: () => ZxySource,
    arr: () => arr,
    covering: () => covering,
    createPattern: () => createPattern,
    cubicBezier: () => cubicBezier,
    exp: () => exp,
    getZoom: () => getZoom,
    labelRules: () => labelRules,
    leafletLayer: () => leafletLayer,
    linear: () => linear,
    paint: () => paint,
    paintRules: () => paintRules,
    sourcesToViews: () => sourcesToViews,
    step: () => step,
    toIndex: () => toIndex,
    transformGeom: () => transformGeom,
    wrap: () => wrap
  });

  // src/frontends/static.ts
  var import_point_geometry7 = __toESM(require_point_geometry());

  // node_modules/color2k/dist/index.exports.import.es.mjs
  function guard(low, high, value) {
    return Math.min(Math.max(low, value), high);
  }
  var ColorError = class extends Error {
    constructor(color) {
      super(`Failed to parse color: "${color}"`);
    }
  };
  var ColorError$1 = ColorError;
  function parseToRgba(color) {
    if (typeof color !== "string")
      throw new ColorError$1(color);
    if (color.trim().toLowerCase() === "transparent")
      return [0, 0, 0, 0];
    let normalizedColor = color.trim();
    normalizedColor = namedColorRegex.test(color) ? nameToHex(color) : color;
    const reducedHexMatch = reducedHexRegex.exec(normalizedColor);
    if (reducedHexMatch) {
      const arr2 = Array.from(reducedHexMatch).slice(1);
      return [...arr2.slice(0, 3).map((x2) => parseInt(r(x2, 2), 16)), parseInt(r(arr2[3] || "f", 2), 16) / 255];
    }
    const hexMatch = hexRegex.exec(normalizedColor);
    if (hexMatch) {
      const arr2 = Array.from(hexMatch).slice(1);
      return [...arr2.slice(0, 3).map((x2) => parseInt(x2, 16)), parseInt(arr2[3] || "ff", 16) / 255];
    }
    const rgbaMatch = rgbaRegex.exec(normalizedColor);
    if (rgbaMatch) {
      const arr2 = Array.from(rgbaMatch).slice(1);
      return [...arr2.slice(0, 3).map((x2) => parseInt(x2, 10)), parseFloat(arr2[3] || "1")];
    }
    const hslaMatch = hslaRegex.exec(normalizedColor);
    if (hslaMatch) {
      const [h, s, l, a] = Array.from(hslaMatch).slice(1).map(parseFloat);
      if (guard(0, 100, s) !== s)
        throw new ColorError$1(color);
      if (guard(0, 100, l) !== l)
        throw new ColorError$1(color);
      return [...hslToRgb(h, s, l), Number.isNaN(a) ? 1 : a];
    }
    throw new ColorError$1(color);
  }
  function hash(str) {
    let hash2 = 5381;
    let i2 = str.length;
    while (i2) {
      hash2 = hash2 * 33 ^ str.charCodeAt(--i2);
    }
    return (hash2 >>> 0) % 2341;
  }
  var colorToInt = (x2) => parseInt(x2.replace(/_/g, ""), 36);
  var compressedColorMap = "1q29ehhb 1n09sgk7 1kl1ekf_ _yl4zsno 16z9eiv3 1p29lhp8 _bd9zg04 17u0____ _iw9zhe5 _to73___ _r45e31e _7l6g016 _jh8ouiv _zn3qba8 1jy4zshs 11u87k0u 1ro9yvyo 1aj3xael 1gz9zjz0 _3w8l4xo 1bf1ekf_ _ke3v___ _4rrkb__ 13j776yz _646mbhl _nrjr4__ _le6mbhl 1n37ehkb _m75f91n _qj3bzfz 1939yygw 11i5z6x8 _1k5f8xs 1509441m 15t5lwgf _ae2th1n _tg1ugcv 1lp1ugcv 16e14up_ _h55rw7n _ny9yavn _7a11xb_ 1ih442g9 _pv442g9 1mv16xof 14e6y7tu 1oo9zkds 17d1cisi _4v9y70f _y98m8kc 1019pq0v 12o9zda8 _348j4f4 1et50i2o _8epa8__ _ts6senj 1o350i2o 1mi9eiuo 1259yrp0 1ln80gnw _632xcoy 1cn9zldc _f29edu4 1n490c8q _9f9ziet 1b94vk74 _m49zkct 1kz6s73a 1eu9dtog _q58s1rz 1dy9sjiq __u89jo3 _aj5nkwg _ld89jo3 13h9z6wx _qa9z2ii _l119xgq _bs5arju 1hj4nwk9 1qt4nwk9 1ge6wau6 14j9zlcw 11p1edc_ _ms1zcxe _439shk6 _jt9y70f _754zsow 1la40eju _oq5p___ _x279qkz 1fa5r3rv _yd2d9ip _424tcku _8y1di2_ _zi2uabw _yy7rn9h 12yz980_ __39ljp6 1b59zg0x _n39zfzp 1fy9zest _b33k___ _hp9wq92 1il50hz4 _io472ub _lj9z3eo 19z9ykg0 _8t8iu3a 12b9bl4a 1ak5yw0o _896v4ku _tb8k8lv _s59zi6t _c09ze0p 1lg80oqn 1id9z8wb _238nba5 1kq6wgdi _154zssg _tn3zk49 _da9y6tc 1sg7cv4f _r12jvtt 1gq5fmkz 1cs9rvci _lp9jn1c _xw1tdnb 13f9zje6 16f6973h _vo7ir40 _bt5arjf _rc45e4t _hr4e100 10v4e100 _hc9zke2 _w91egv_ _sj2r1kk 13c87yx8 _vqpds__ _ni8ggk8 _tj9yqfb 1ia2j4r4 _7x9b10u 1fc9ld4j 1eq9zldr _5j9lhpx _ez9zl6o _md61fzm".split(" ").reduce((acc, next) => {
    const key = colorToInt(next.substring(0, 3));
    const hex = colorToInt(next.substring(3)).toString(16);
    let prefix = "";
    for (let i2 = 0; i2 < 6 - hex.length; i2++) {
      prefix += "0";
    }
    acc[key] = `${prefix}${hex}`;
    return acc;
  }, {});
  function nameToHex(color) {
    const normalizedColorName = color.toLowerCase().trim();
    const result = compressedColorMap[hash(normalizedColorName)];
    if (!result)
      throw new ColorError$1(color);
    return `#${result}`;
  }
  var r = (str, amount) => Array.from(Array(amount)).map(() => str).join("");
  var reducedHexRegex = new RegExp(`^#${r("([a-f0-9])", 3)}([a-f0-9])?$`, "i");
  var hexRegex = new RegExp(`^#${r("([a-f0-9]{2})", 3)}([a-f0-9]{2})?$`, "i");
  var rgbaRegex = new RegExp(`^rgba?\\(\\s*(\\d+)\\s*${r(",\\s*(\\d+)\\s*", 2)}(?:,\\s*([\\d.]+))?\\s*\\)$`, "i");
  var hslaRegex = /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i;
  var namedColorRegex = /^[a-z]+$/i;
  var roundColor = (color) => {
    return Math.round(color * 255);
  };
  var hslToRgb = (hue, saturation, lightness) => {
    let l = lightness / 100;
    if (saturation === 0) {
      return [l, l, l].map(roundColor);
    }
    const huePrime = (hue % 360 + 360) % 360 / 60;
    const chroma = (1 - Math.abs(2 * l - 1)) * (saturation / 100);
    const secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
    let red = 0;
    let green = 0;
    let blue = 0;
    if (huePrime >= 0 && huePrime < 1) {
      red = chroma;
      green = secondComponent;
    } else if (huePrime >= 1 && huePrime < 2) {
      red = secondComponent;
      green = chroma;
    } else if (huePrime >= 2 && huePrime < 3) {
      green = chroma;
      blue = secondComponent;
    } else if (huePrime >= 3 && huePrime < 4) {
      green = secondComponent;
      blue = chroma;
    } else if (huePrime >= 4 && huePrime < 5) {
      red = secondComponent;
      blue = chroma;
    } else if (huePrime >= 5 && huePrime < 6) {
      red = chroma;
      blue = secondComponent;
    }
    const lightnessModification = l - chroma / 2;
    const finalRed = red + lightnessModification;
    const finalGreen = green + lightnessModification;
    const finalBlue = blue + lightnessModification;
    return [finalRed, finalGreen, finalBlue].map(roundColor);
  };
  function rgba(red, green, blue, alpha) {
    return `rgba(${guard(0, 255, red).toFixed()}, ${guard(0, 255, green).toFixed()}, ${guard(0, 255, blue).toFixed()}, ${parseFloat(guard(0, 1, alpha).toFixed(3))})`;
  }
  function mix(color1, color2, weight) {
    const normalize = (n, index) => index === 3 ? n : n / 255;
    const [r1, g1, b1, a1] = parseToRgba(color1).map(normalize);
    const [r2, g2, b2, a2] = parseToRgba(color2).map(normalize);
    const alphaDelta = a2 - a1;
    const normalizedWeight = weight * 2 - 1;
    const combinedWeight = normalizedWeight * alphaDelta === -1 ? normalizedWeight : normalizedWeight + alphaDelta / (1 + normalizedWeight * alphaDelta);
    const weight2 = (combinedWeight + 1) / 2;
    const weight1 = 1 - weight2;
    const r3 = (r1 * weight1 + r2 * weight2) * 255;
    const g = (g1 * weight1 + g2 * weight2) * 255;
    const b = (b1 * weight1 + b2 * weight2) * 255;
    const a = a2 * weight + a1 * (1 - weight);
    return rgba(r3, g, b, a);
  }

  // src/symbolizer.ts
  var import_point_geometry3 = __toESM(require_point_geometry());
  var import_unitbezier = __toESM(require_unitbezier());

  // src/attribute.ts
  var StringAttr = class {
    constructor(c, defaultValue) {
      this.str = c != null ? c : defaultValue;
      this.perFeature = typeof this.str === "function" && this.str.length === 2;
    }
    get(z, f) {
      if (typeof this.str === "function") {
        return this.str(z, f);
      }
      return this.str;
    }
  };
  var NumberAttr = class {
    constructor(c, defaultValue = 1) {
      this.value = c != null ? c : defaultValue;
      this.perFeature = typeof this.value === "function" && this.value.length === 2;
    }
    get(z, f) {
      if (typeof this.value === "function") {
        return this.value(z, f);
      }
      return this.value;
    }
  };
  var TextAttr = class {
    constructor(options) {
      var _a2;
      this.labelProps = (_a2 = options == null ? void 0 : options.labelProps) != null ? _a2 : ["name"];
      this.textTransform = options == null ? void 0 : options.textTransform;
    }
    get(z, f) {
      let retval;
      let labelProps;
      if (typeof this.labelProps === "function") {
        labelProps = this.labelProps(z, f);
      } else {
        labelProps = this.labelProps;
      }
      for (const property of labelProps) {
        if (Object.prototype.hasOwnProperty.call(f.props, property) && typeof f.props[property] === "string") {
          retval = f.props[property];
          break;
        }
      }
      let transform;
      if (typeof this.textTransform === "function") {
        transform = this.textTransform(z, f);
      } else {
        transform = this.textTransform;
      }
      if (retval && transform === "uppercase")
        retval = retval.toUpperCase();
      else if (retval && transform === "lowercase")
        retval = retval.toLowerCase();
      else if (retval && transform === "capitalize") {
        const wordsArray = retval.toLowerCase().split(" ");
        const capsArray = wordsArray.map((word) => {
          return word[0].toUpperCase() + word.slice(1);
        });
        retval = capsArray.join(" ");
      }
      return retval;
    }
  };
  var FontAttr = class {
    constructor(options) {
      var _a2, _b2;
      if (options == null ? void 0 : options.font) {
        this.font = options.font;
      } else {
        this.family = (_a2 = options == null ? void 0 : options.fontFamily) != null ? _a2 : "sans-serif";
        this.size = (_b2 = options == null ? void 0 : options.fontSize) != null ? _b2 : 12;
        this.weight = options == null ? void 0 : options.fontWeight;
        this.style = options == null ? void 0 : options.fontStyle;
      }
    }
    get(z, f) {
      if (this.font) {
        if (typeof this.font === "function") {
          return this.font(z, f);
        }
        return this.font;
      }
      let style = "";
      if (this.style) {
        if (typeof this.style === "function") {
          style = `${this.style(z, f)} `;
        } else {
          style = `${this.style} `;
        }
      }
      let weight = "";
      if (this.weight) {
        if (typeof this.weight === "function") {
          weight = `${this.weight(z, f)} `;
        } else {
          weight = `${this.weight} `;
        }
      }
      let size;
      if (typeof this.size === "function") {
        size = this.size(z, f);
      } else {
        size = this.size;
      }
      let family;
      if (typeof this.family === "function") {
        family = this.family(z, f);
      } else {
        family = this.family;
      }
      return `${style}${weight}${size}px ${family}`;
    }
  };
  var ArrayAttr = class {
    constructor(c, defaultValue = []) {
      this.value = c != null ? c : defaultValue;
      this.perFeature = typeof this.value === "function" && this.value.length === 2;
    }
    get(z, f) {
      if (typeof this.value === "function") {
        return this.value(z, f);
      }
      return this.value;
    }
  };

  // src/line.ts
  var import_point_geometry = __toESM(require_point_geometry());
  var linelabel = (pts, maxAngleDelta, targetLen) => {
    const chunks = [];
    let a;
    let b;
    let c;
    let i2 = 0;
    let n = 0;
    let d = 0;
    let abmag = 0;
    let bcmag = 0;
    let abx = 0;
    let aby = 0;
    let bcx = 0;
    let bcy = 0;
    let dt = 0;
    let iStart = 0;
    let dStart = 0;
    if (pts.length < 2)
      return [];
    if (pts.length === 2) {
      d = Math.sqrt(__pow(pts[1].x - pts[0].x, 2) + __pow(pts[1].y - pts[0].y, 2));
      return [
        {
          length: d,
          beginIndex: 0,
          beginDistance: 0,
          endIndex: 2,
          endDistance: d
        }
      ];
    }
    abmag = Math.sqrt(__pow(pts[1].x - pts[0].x, 2) + __pow(pts[1].y - pts[0].y, 2));
    for (i2 = 1, n = pts.length - 1; i2 < n; i2++) {
      a = pts[i2 - 1];
      b = pts[i2];
      c = pts[i2 + 1];
      abx = b.x - a.x;
      aby = b.y - a.y;
      bcx = c.x - b.x;
      bcy = c.y - b.y;
      bcmag = Math.sqrt(bcx * bcx + bcy * bcy);
      d += abmag;
      dt = Math.acos((abx * bcx + aby * bcy) / (abmag * bcmag));
      if (dt > maxAngleDelta || d - dStart > targetLen) {
        chunks.push({
          length: d - dStart,
          beginDistance: dStart,
          beginIndex: iStart,
          endIndex: i2 + 1,
          endDistance: d
        });
        iStart = i2;
        dStart = d;
      }
      abmag = bcmag;
    }
    if (i2 - iStart > 0) {
      chunks.push({
        length: d - dStart + bcmag,
        beginIndex: iStart,
        beginDistance: dStart,
        endIndex: i2 + 1,
        endDistance: d + bcmag
      });
    }
    return chunks;
  };
  function simpleLabel(mls, minimum, repeatDistance, cellSize) {
    const candidates = [];
    for (const ls of mls) {
      const segments = linelabel(ls, Math.PI / 45, minimum);
      for (const segment of segments) {
        if (segment.length >= minimum + cellSize) {
          const start = new import_point_geometry.default(
            ls[segment.beginIndex].x,
            ls[segment.beginIndex].y
          );
          const end = ls[segment.endIndex - 1];
          const normalized = new import_point_geometry.default(
            (end.x - start.x) / segment.length,
            (end.y - start.y) / segment.length
          );
          for (let i2 = cellSize; i2 < segment.length - minimum; i2 += repeatDistance) {
            candidates.push({
              start: start.add(normalized.mult(i2)),
              end: start.add(normalized.mult(i2 + minimum))
            });
          }
        }
      }
    }
    return candidates;
  }
  function lineCells(a, b, length, spacing) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(__pow(b.x - a.x, 2) + __pow(b.y - a.y, 2));
    const retval = [];
    for (let i2 = 0; i2 < length + spacing; i2 += 2 * spacing) {
      const factor = i2 * 1 / dist;
      retval.push({ x: a.x + factor * dx, y: a.y + factor * dy });
    }
    return retval;
  }

  // src/text.ts
  function linebreak(str, maxUnits) {
    if (str.length <= maxUnits)
      return [str];
    const endIndex = maxUnits - 1;
    const spaceBefore = str.lastIndexOf(" ", endIndex);
    const spaceAfter = str.indexOf(" ", endIndex);
    if (spaceBefore === -1 && spaceAfter === -1) {
      return [str];
    }
    let first;
    let after;
    if (spaceAfter === -1 || spaceBefore >= 0 && endIndex - spaceBefore < spaceAfter - endIndex) {
      first = str.substring(0, spaceBefore);
      after = str.substring(spaceBefore + 1, str.length);
    } else {
      first = str.substring(0, spaceAfter);
      after = str.substring(spaceAfter + 1, str.length);
    }
    return [first, ...linebreak(after, maxUnits)];
  }
  var CJK_CHARS = "\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DB5\u4E00-\u9FEA\uF900-\uFA6D\uFA70-\uFAD9\u2000";
  var cjkTest = new RegExp(`^[${CJK_CHARS}]+$`);

  // src/tilecache.ts
  var import_point_geometry2 = __toESM(require_point_geometry());
  var import_vector_tile = __toESM(require_vector_tile());
  var import_pbf = __toESM(require_pbf());

  // node_modules/pmtiles/dist/index.mjs
  var __async2 = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step2(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step2(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step2 = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
      step2((generator = generator.apply(__this, __arguments)).next());
    });
  };
  var u8 = Uint8Array;
  var u16 = Uint16Array;
  var u32 = Uint32Array;
  var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
  var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start) {
    var b = new u16(31);
    for (var i2 = 0; i2 < 31; ++i2) {
      b[i2] = start += 1 << eb[i2 - 1];
    }
    var r2 = new u32(b[30]);
    for (var i2 = 1; i2 < 30; ++i2) {
      for (var j = b[i2]; j < b[i2 + 1]; ++j) {
        r2[j] = j - b[i2] << 5 | i2;
      }
    }
    return [b, r2];
  };
  var _a = freb(fleb, 2);
  var fl = _a[0];
  var revfl = _a[1];
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0);
  var fd = _b[0];
  var revfd = _b[1];
  var rev = new u16(32768);
  for (i = 0; i < 32768; ++i) {
    x = (i & 43690) >>> 1 | (i & 21845) << 1;
    x = (x & 52428) >>> 2 | (x & 13107) << 2;
    x = (x & 61680) >>> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
  }
  var x;
  var i;
  var hMap = function(cd, mb, r2) {
    var s = cd.length;
    var i2 = 0;
    var l = new u16(mb);
    for (; i2 < s; ++i2) {
      if (cd[i2])
        ++l[cd[i2] - 1];
    }
    var le = new u16(mb);
    for (i2 = 0; i2 < mb; ++i2) {
      le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
    }
    var co;
    if (r2) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          var sv = i2 << 4 | cd[i2];
          var r_1 = mb - cd[i2];
          var v = le[cd[i2] - 1]++ << r_1;
          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
            co[rev[v] >>> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s);
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          co[i2] = rev[le[cd[i2] - 1]++] >>> 15 - cd[i2];
        }
      }
    }
    return co;
  };
  var flt = new u8(288);
  for (i = 0; i < 144; ++i)
    flt[i] = 8;
  var i;
  for (i = 144; i < 256; ++i)
    flt[i] = 9;
  var i;
  for (i = 256; i < 280; ++i)
    flt[i] = 7;
  var i;
  for (i = 280; i < 288; ++i)
    flt[i] = 8;
  var i;
  var fdt = new u8(32);
  for (i = 0; i < 32; ++i)
    fdt[i] = 5;
  var i;
  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
  var max = function(a) {
    var m = a[0];
    for (var i2 = 1; i2 < a.length; ++i2) {
      if (a[i2] > m)
        m = a[i2];
    }
    return m;
  };
  var bits = function(d, p, m) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
  };
  var bits16 = function(d, p) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
  };
  var shft = function(p) {
    return (p + 7) / 8 | 0;
  };
  var slc = function(v, s, e) {
    if (s == null || s < 0)
      s = 0;
    if (e == null || e > v.length)
      e = v.length;
    var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
    n.set(v.subarray(s, e));
    return n;
  };
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
  ];
  var err = function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e, err);
    if (!nt)
      throw e;
    return e;
  };
  var inflt = function(dat, buf, st) {
    var sl = dat.length;
    if (!sl || st && st.f && !st.l)
      return buf || new u8(0);
    var noBuf = !buf || st;
    var noSt = !st || st.i;
    if (!st)
      st = {};
    if (!buf)
      buf = new u8(sl * 3);
    var cbuf = function(l2) {
      var bl = buf.length;
      if (l2 > bl) {
        var nbuf = new u8(Math.max(bl * 2, l2));
        nbuf.set(buf);
        buf = nbuf;
      }
    };
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    var tbts = sl * 8;
    do {
      if (!lm) {
        final = bits(dat, pos, 1);
        var type = bits(dat, pos + 1, 3);
        pos += 3;
        if (!type) {
          var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
          if (t > sl) {
            if (noSt)
              err(0);
            break;
          }
          if (noBuf)
            cbuf(bt + l);
          buf.set(dat.subarray(s, t), bt);
          st.b = bt += l, st.p = pos = t * 8, st.f = final;
          continue;
        } else if (type == 1)
          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
        else if (type == 2) {
          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
          var tl = hLit + bits(dat, pos + 5, 31) + 1;
          pos += 14;
          var ldt = new u8(tl);
          var clt = new u8(19);
          for (var i2 = 0; i2 < hcLen; ++i2) {
            clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
          }
          pos += hcLen * 3;
          var clb = max(clt), clbmsk = (1 << clb) - 1;
          var clm = hMap(clt, clb, 1);
          for (var i2 = 0; i2 < tl; ) {
            var r2 = clm[bits(dat, pos, clbmsk)];
            pos += r2 & 15;
            var s = r2 >>> 4;
            if (s < 16) {
              ldt[i2++] = s;
            } else {
              var c = 0, n = 0;
              if (s == 16)
                n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i2 - 1];
              else if (s == 17)
                n = 3 + bits(dat, pos, 7), pos += 3;
              else if (s == 18)
                n = 11 + bits(dat, pos, 127), pos += 7;
              while (n--)
                ldt[i2++] = c;
            }
          }
          var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
          lbt = max(lt);
          dbt = max(dt);
          lm = hMap(lt, lbt, 1);
          dm = hMap(dt, dbt, 1);
        } else
          err(1);
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
      }
      if (noBuf)
        cbuf(bt + 131072);
      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
      var lpos = pos;
      for (; ; lpos = pos) {
        var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
        pos += c & 15;
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (!c)
          err(2);
        if (sym < 256)
          buf[bt++] = sym;
        else if (sym == 256) {
          lpos = pos, lm = null;
          break;
        } else {
          var add = sym - 254;
          if (sym > 264) {
            var i2 = sym - 257, b = fleb[i2];
            add = bits(dat, pos, (1 << b) - 1) + fl[i2];
            pos += b;
          }
          var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
          if (!d)
            err(3);
          pos += d & 15;
          var dt = fd[dsym];
          if (dsym > 3) {
            var b = fdeb[dsym];
            dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
          }
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (noBuf)
            cbuf(bt + 131072);
          var end = bt + add;
          for (; bt < end; bt += 4) {
            buf[bt] = buf[bt - dt];
            buf[bt + 1] = buf[bt + 1 - dt];
            buf[bt + 2] = buf[bt + 2 - dt];
            buf[bt + 3] = buf[bt + 3 - dt];
          }
          bt = end;
        }
      }
      st.l = lm, st.p = lpos, st.b = bt, st.f = final;
      if (lm)
        final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt == buf.length ? buf : slc(buf, 0, bt);
  };
  var et = /* @__PURE__ */ new u8(0);
  var gzs = function(d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8)
      err(6, "invalid gzip data");
    var flg = d[3];
    var st = 10;
    if (flg & 4)
      st += d[10] | (d[11] << 8) + 2;
    for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
      ;
    return st + (flg & 2);
  };
  var gzl = function(d) {
    var l = d.length;
    return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
  };
  var zlv = function(d) {
    if ((d[0] & 15) != 8 || d[0] >>> 4 > 7 || (d[0] << 8 | d[1]) % 31)
      err(6, "invalid zlib data");
    if (d[1] & 32)
      err(6, "invalid zlib data: preset dictionaries not supported");
  };
  function inflateSync(data, out) {
    return inflt(data, out);
  }
  function gunzipSync(data, out) {
    return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
  }
  function unzlibSync(data, out) {
    return inflt((zlv(data), data.subarray(2, -4)), out);
  }
  function decompressSync(data, out) {
    return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzipSync(data, out) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflateSync(data, out) : unzlibSync(data, out);
  }
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e) {
  }
  var shift = (n, shift2) => {
    return n * Math.pow(2, shift2);
  };
  var unshift = (n, shift2) => {
    return Math.floor(n / Math.pow(2, shift2));
  };
  var getUint24 = (view, pos) => {
    return shift(view.getUint16(pos + 1, true), 8) + view.getUint8(pos);
  };
  var getUint48 = (view, pos) => {
    return shift(view.getUint32(pos + 2, true), 16) + view.getUint16(pos, true);
  };
  var compare = (tz, tx, ty, view, i2) => {
    if (tz != view.getUint8(i2))
      return tz - view.getUint8(i2);
    const x2 = getUint24(view, i2 + 1);
    if (tx != x2)
      return tx - x2;
    const y = getUint24(view, i2 + 4);
    if (ty != y)
      return ty - y;
    return 0;
  };
  var queryLeafdir = (view, z, x2, y) => {
    const offset_len = queryView(view, z | 128, x2, y);
    if (offset_len) {
      return {
        z,
        x: x2,
        y,
        offset: offset_len[0],
        length: offset_len[1],
        is_dir: true
      };
    }
    return null;
  };
  var queryTile = (view, z, x2, y) => {
    const offset_len = queryView(view, z, x2, y);
    if (offset_len) {
      return {
        z,
        x: x2,
        y,
        offset: offset_len[0],
        length: offset_len[1],
        is_dir: false
      };
    }
    return null;
  };
  var queryView = (view, z, x2, y) => {
    let m = 0;
    let n = view.byteLength / 17 - 1;
    while (m <= n) {
      const k = n + m >> 1;
      const cmp = compare(z, x2, y, view, k * 17);
      if (cmp > 0) {
        m = k + 1;
      } else if (cmp < 0) {
        n = k - 1;
      } else {
        return [getUint48(view, k * 17 + 7), view.getUint32(k * 17 + 13, true)];
      }
    }
    return null;
  };
  var entrySort = (a, b) => {
    if (a.is_dir && !b.is_dir) {
      return 1;
    }
    if (!a.is_dir && b.is_dir) {
      return -1;
    }
    if (a.z !== b.z) {
      return a.z - b.z;
    }
    if (a.x !== b.x) {
      return a.x - b.x;
    }
    return a.y - b.y;
  };
  var parseEntry = (dataview, i2) => {
    const z_raw = dataview.getUint8(i2 * 17);
    const z = z_raw & 127;
    return {
      z,
      x: getUint24(dataview, i2 * 17 + 1),
      y: getUint24(dataview, i2 * 17 + 4),
      offset: getUint48(dataview, i2 * 17 + 7),
      length: dataview.getUint32(i2 * 17 + 13, true),
      is_dir: z_raw >> 7 === 1
    };
  };
  var sortDir = (a) => {
    const entries = [];
    const view = new DataView(a);
    for (let i2 = 0; i2 < view.byteLength / 17; i2++) {
      entries.push(parseEntry(view, i2));
    }
    return createDirectory(entries);
  };
  var createDirectory = (entries) => {
    entries.sort(entrySort);
    const buffer = new ArrayBuffer(17 * entries.length);
    const arr2 = new Uint8Array(buffer);
    for (let i2 = 0; i2 < entries.length; i2++) {
      const entry = entries[i2];
      let z = entry.z;
      if (entry.is_dir)
        z = z | 128;
      arr2[i2 * 17] = z;
      arr2[i2 * 17 + 1] = entry.x & 255;
      arr2[i2 * 17 + 2] = entry.x >> 8 & 255;
      arr2[i2 * 17 + 3] = entry.x >> 16 & 255;
      arr2[i2 * 17 + 4] = entry.y & 255;
      arr2[i2 * 17 + 5] = entry.y >> 8 & 255;
      arr2[i2 * 17 + 6] = entry.y >> 16 & 255;
      arr2[i2 * 17 + 7] = entry.offset & 255;
      arr2[i2 * 17 + 8] = unshift(entry.offset, 8) & 255;
      arr2[i2 * 17 + 9] = unshift(entry.offset, 16) & 255;
      arr2[i2 * 17 + 10] = unshift(entry.offset, 24) & 255;
      arr2[i2 * 17 + 11] = unshift(entry.offset, 32) & 255;
      arr2[i2 * 17 + 12] = unshift(entry.offset, 48) & 255;
      arr2[i2 * 17 + 13] = entry.length & 255;
      arr2[i2 * 17 + 14] = entry.length >> 8 & 255;
      arr2[i2 * 17 + 15] = entry.length >> 16 & 255;
      arr2[i2 * 17 + 16] = entry.length >> 24 & 255;
    }
    return buffer;
  };
  var deriveLeaf = (view, tile) => {
    if (view.byteLength < 17)
      return null;
    const numEntries = view.byteLength / 17;
    const entry = parseEntry(view, numEntries - 1);
    if (entry.is_dir) {
      const leaf_level = entry.z;
      const level_diff = tile.z - leaf_level;
      const leaf_x = Math.trunc(tile.x / (1 << level_diff));
      const leaf_y = Math.trunc(tile.y / (1 << level_diff));
      return { z: leaf_level, x: leaf_x, y: leaf_y };
    }
    return null;
  };
  function getHeader(source) {
    return __async2(this, null, function* () {
      const resp = yield source.getBytes(0, 512e3);
      const dataview = new DataView(resp.data);
      const json_size = dataview.getUint32(4, true);
      const root_entries = dataview.getUint16(8, true);
      const dec = new TextDecoder("utf-8");
      const json_metadata = JSON.parse(
        dec.decode(new DataView(resp.data, 10, json_size))
      );
      let tile_compression = 0;
      if (json_metadata.compression === "gzip") {
        tile_compression = 2;
      }
      let minzoom = 0;
      if ("minzoom" in json_metadata) {
        minzoom = +json_metadata.minzoom;
      }
      let maxzoom = 0;
      if ("maxzoom" in json_metadata) {
        maxzoom = +json_metadata.maxzoom;
      }
      let center_lon = 0;
      let center_lat = 0;
      let center_zoom = 0;
      let min_lon = -180;
      let min_lat = -85;
      let max_lon = 180;
      let max_lat = 85;
      if (json_metadata.bounds) {
        const split = json_metadata.bounds.split(",");
        min_lon = +split[0];
        min_lat = +split[1];
        max_lon = +split[2];
        max_lat = +split[3];
      }
      if (json_metadata.center) {
        const split = json_metadata.center.split(",");
        center_lon = +split[0];
        center_lat = +split[1];
        center_zoom = +split[2];
      }
      const header = {
        specVersion: dataview.getUint16(2, true),
        rootDirectoryOffset: 10 + json_size,
        rootDirectoryLength: root_entries * 17,
        jsonMetadataOffset: 10,
        jsonMetadataLength: json_size,
        leafDirectoryOffset: 0,
        leafDirectoryLength: void 0,
        tileDataOffset: 0,
        tileDataLength: void 0,
        numAddressedTiles: 0,
        numTileEntries: 0,
        numTileContents: 0,
        clustered: false,
        internalCompression: 1,
        tileCompression: tile_compression,
        tileType: 1,
        minZoom: minzoom,
        maxZoom: maxzoom,
        minLon: min_lon,
        minLat: min_lat,
        maxLon: max_lon,
        maxLat: max_lat,
        centerZoom: center_zoom,
        centerLon: center_lon,
        centerLat: center_lat,
        etag: resp.etag
      };
      return header;
    });
  }
  function getZxy(header, source, cache, z, x2, y, signal) {
    return __async2(this, null, function* () {
      let root_dir = yield cache.getArrayBuffer(
        source,
        header.rootDirectoryOffset,
        header.rootDirectoryLength,
        header
      );
      if (header.specVersion === 1) {
        root_dir = sortDir(root_dir);
      }
      const entry = queryTile(new DataView(root_dir), z, x2, y);
      if (entry) {
        const resp = yield source.getBytes(entry.offset, entry.length, signal);
        let tile_data = resp.data;
        const view = new DataView(tile_data);
        if (view.getUint8(0) == 31 && view.getUint8(1) == 139) {
          tile_data = decompressSync(new Uint8Array(tile_data));
        }
        return {
          data: tile_data
        };
      }
      const leafcoords = deriveLeaf(new DataView(root_dir), { z, x: x2, y });
      if (leafcoords) {
        const leafdir_entry = queryLeafdir(
          new DataView(root_dir),
          leafcoords.z,
          leafcoords.x,
          leafcoords.y
        );
        if (leafdir_entry) {
          let leaf_dir = yield cache.getArrayBuffer(
            source,
            leafdir_entry.offset,
            leafdir_entry.length,
            header
          );
          if (header.specVersion === 1) {
            leaf_dir = sortDir(leaf_dir);
          }
          const tile_entry = queryTile(new DataView(leaf_dir), z, x2, y);
          if (tile_entry) {
            const resp = yield source.getBytes(
              tile_entry.offset,
              tile_entry.length,
              signal
            );
            let tile_data = resp.data;
            const view = new DataView(tile_data);
            if (view.getUint8(0) == 31 && view.getUint8(1) == 139) {
              tile_data = decompressSync(new Uint8Array(tile_data));
            }
            return {
              data: tile_data
            };
          }
        }
      }
      return void 0;
    });
  }
  var v2_default = {
    getHeader,
    getZxy
  };
  function toNum(low, high) {
    return (high >>> 0) * 4294967296 + (low >>> 0);
  }
  function readVarintRemainder(l, p) {
    const buf = p.buf;
    let h, b;
    b = buf[p.pos++];
    h = (b & 112) >> 4;
    if (b < 128)
      return toNum(l, h);
    b = buf[p.pos++];
    h |= (b & 127) << 3;
    if (b < 128)
      return toNum(l, h);
    b = buf[p.pos++];
    h |= (b & 127) << 10;
    if (b < 128)
      return toNum(l, h);
    b = buf[p.pos++];
    h |= (b & 127) << 17;
    if (b < 128)
      return toNum(l, h);
    b = buf[p.pos++];
    h |= (b & 127) << 24;
    if (b < 128)
      return toNum(l, h);
    b = buf[p.pos++];
    h |= (b & 1) << 31;
    if (b < 128)
      return toNum(l, h);
    throw new Error("Expected varint not more than 10 bytes");
  }
  function readVarint(p) {
    const buf = p.buf;
    let val, b;
    b = buf[p.pos++];
    val = b & 127;
    if (b < 128)
      return val;
    b = buf[p.pos++];
    val |= (b & 127) << 7;
    if (b < 128)
      return val;
    b = buf[p.pos++];
    val |= (b & 127) << 14;
    if (b < 128)
      return val;
    b = buf[p.pos++];
    val |= (b & 127) << 21;
    if (b < 128)
      return val;
    b = buf[p.pos];
    val |= (b & 15) << 28;
    return readVarintRemainder(val, p);
  }
  function rotate(n, xy, rx, ry) {
    if (ry == 0) {
      if (rx == 1) {
        xy[0] = n - 1 - xy[0];
        xy[1] = n - 1 - xy[1];
      }
      const t = xy[0];
      xy[0] = xy[1];
      xy[1] = t;
    }
  }
  function zxyToTileId(z, x2, y) {
    if (z > 26) {
      throw Error("Tile zoom level exceeds max safe number limit (26)");
    }
    if (x2 > Math.pow(2, z) - 1 || y > Math.pow(2, z) - 1) {
      throw Error("tile x/y outside zoom level bounds");
    }
    let acc = 0;
    let tz = 0;
    while (tz < z) {
      acc += Math.pow(2, tz) * Math.pow(2, tz);
      tz++;
    }
    const n = Math.pow(2, z);
    let rx = 0;
    let ry = 0;
    let d = 0;
    const xy = [x2, y];
    let s = n / 2;
    while (s > 0) {
      rx = (xy[0] & s) > 0 ? 1 : 0;
      ry = (xy[1] & s) > 0 ? 1 : 0;
      d += s * s * (3 * rx ^ ry);
      rotate(s, xy, rx, ry);
      s = s / 2;
    }
    return acc + d;
  }
  function fflateDecompress(buf, compression) {
    return __async2(this, null, function* () {
      if (compression === 1 || compression === 0) {
        return buf;
      } else if (compression === 2) {
        return decompressSync(new Uint8Array(buf));
      } else {
        throw Error("Compression method not supported");
      }
    });
  }
  var HEADER_SIZE_BYTES = 127;
  function findTile(entries, tileId) {
    let m = 0;
    let n = entries.length - 1;
    while (m <= n) {
      const k = n + m >> 1;
      const cmp = tileId - entries[k].tileId;
      if (cmp > 0) {
        m = k + 1;
      } else if (cmp < 0) {
        n = k - 1;
      } else {
        return entries[k];
      }
    }
    if (n >= 0) {
      if (entries[n].runLength === 0) {
        return entries[n];
      }
      if (tileId - entries[n].tileId < entries[n].runLength) {
        return entries[n];
      }
    }
    return null;
  }
  var FetchSource = class {
    constructor(url) {
      this.url = url;
    }
    getKey() {
      return this.url;
    }
    getBytes(offset, length, signal) {
      return __async2(this, null, function* () {
        let controller;
        if (!signal) {
          controller = new AbortController();
          signal = controller.signal;
        }
        let resp = yield fetch(this.url, {
          signal,
          headers: { Range: "bytes=" + offset + "-" + (offset + length - 1) }
        });
        if (resp.status === 416 && offset === 0) {
          const content_range = resp.headers.get("Content-Range");
          if (!content_range || !content_range.startsWith("bytes */")) {
            throw Error("Missing content-length on 416 response");
          }
          const actual_length = +content_range.substr(8);
          resp = yield fetch(this.url, {
            signal,
            headers: { Range: "bytes=0-" + (actual_length - 1) }
          });
        }
        if (resp.status >= 300) {
          throw Error("Bad response code: " + resp.status);
        }
        const content_length = resp.headers.get("Content-Length");
        if (resp.status === 200 && (!content_length || +content_length > length)) {
          if (controller)
            controller.abort();
          throw Error(
            "Server returned no content-length header or content-length exceeding request. Check that your storage backend supports HTTP Byte Serving."
          );
        }
        const a = yield resp.arrayBuffer();
        return {
          data: a,
          etag: resp.headers.get("ETag") || void 0,
          cacheControl: resp.headers.get("Cache-Control") || void 0,
          expires: resp.headers.get("Expires") || void 0
        };
      });
    }
  };
  function getUint64(v, offset) {
    const wh = v.getUint32(offset + 4, true);
    const wl = v.getUint32(offset + 0, true);
    return wh * Math.pow(2, 32) + wl;
  }
  function bytesToHeader(bytes, etag) {
    const v = new DataView(bytes);
    const spec_version = v.getUint8(7);
    if (spec_version > 3) {
      throw Error(
        `Archive is spec version ${spec_version} but this library supports up to spec version 3`
      );
    }
    return {
      specVersion: spec_version,
      rootDirectoryOffset: getUint64(v, 8),
      rootDirectoryLength: getUint64(v, 16),
      jsonMetadataOffset: getUint64(v, 24),
      jsonMetadataLength: getUint64(v, 32),
      leafDirectoryOffset: getUint64(v, 40),
      leafDirectoryLength: getUint64(v, 48),
      tileDataOffset: getUint64(v, 56),
      tileDataLength: getUint64(v, 64),
      numAddressedTiles: getUint64(v, 72),
      numTileEntries: getUint64(v, 80),
      numTileContents: getUint64(v, 88),
      clustered: v.getUint8(96) === 1,
      internalCompression: v.getUint8(97),
      tileCompression: v.getUint8(98),
      tileType: v.getUint8(99),
      minZoom: v.getUint8(100),
      maxZoom: v.getUint8(101),
      minLon: v.getInt32(102, true) / 1e7,
      minLat: v.getInt32(106, true) / 1e7,
      maxLon: v.getInt32(110, true) / 1e7,
      maxLat: v.getInt32(114, true) / 1e7,
      centerZoom: v.getUint8(118),
      centerLon: v.getInt32(119, true) / 1e7,
      centerLat: v.getInt32(123, true) / 1e7,
      etag
    };
  }
  function deserializeIndex(buffer) {
    const p = { buf: new Uint8Array(buffer), pos: 0 };
    const numEntries = readVarint(p);
    const entries = [];
    let lastId = 0;
    for (let i2 = 0; i2 < numEntries; i2++) {
      const v = readVarint(p);
      entries.push({ tileId: lastId + v, offset: 0, length: 0, runLength: 1 });
      lastId += v;
    }
    for (let i2 = 0; i2 < numEntries; i2++) {
      entries[i2].runLength = readVarint(p);
    }
    for (let i2 = 0; i2 < numEntries; i2++) {
      entries[i2].length = readVarint(p);
    }
    for (let i2 = 0; i2 < numEntries; i2++) {
      const v = readVarint(p);
      if (v === 0 && i2 > 0) {
        entries[i2].offset = entries[i2 - 1].offset + entries[i2 - 1].length;
      } else {
        entries[i2].offset = v - 1;
      }
    }
    return entries;
  }
  function detectVersion(a) {
    const v = new DataView(a);
    if (v.getUint16(2, true) === 2) {
      console.warn(
        "PMTiles spec version 2 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"
      );
      return 2;
    } else if (v.getUint16(2, true) === 1) {
      console.warn(
        "PMTiles spec version 1 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"
      );
      return 1;
    }
    return 3;
  }
  var EtagMismatch = class extends Error {
  };
  function getHeaderAndRoot(source, decompress, prefetch, current_etag) {
    return __async2(this, null, function* () {
      const resp = yield source.getBytes(0, 16384);
      const v = new DataView(resp.data);
      if (v.getUint16(0, true) !== 19792) {
        throw new Error("Wrong magic number for PMTiles archive");
      }
      if (detectVersion(resp.data) < 3) {
        return [yield v2_default.getHeader(source)];
      }
      const headerData = resp.data.slice(0, HEADER_SIZE_BYTES);
      let resp_etag = resp.etag;
      if (current_etag && resp.etag != current_etag) {
        console.warn(
          "ETag conflict detected; your HTTP server might not support content-based ETag headers. ETags disabled for " + source.getKey()
        );
        resp_etag = void 0;
      }
      const header = bytesToHeader(headerData, resp_etag);
      if (prefetch) {
        const rootDirData = resp.data.slice(
          header.rootDirectoryOffset,
          header.rootDirectoryOffset + header.rootDirectoryLength
        );
        const dirKey = source.getKey() + "|" + (header.etag || "") + "|" + header.rootDirectoryOffset + "|" + header.rootDirectoryLength;
        const rootDir = deserializeIndex(
          yield decompress(rootDirData, header.internalCompression)
        );
        return [header, [dirKey, rootDir.length, rootDir]];
      }
      return [header, void 0];
    });
  }
  function getDirectory(source, decompress, offset, length, header) {
    return __async2(this, null, function* () {
      const resp = yield source.getBytes(offset, length);
      if (header.etag && header.etag !== resp.etag) {
        throw new EtagMismatch(resp.etag);
      }
      const data = yield decompress(resp.data, header.internalCompression);
      const directory = deserializeIndex(data);
      if (directory.length === 0) {
        throw new Error("Empty directory is invalid");
      }
      return directory;
    });
  }
  var SharedPromiseCache = class {
    constructor(maxCacheEntries = 100, prefetch = true, decompress = fflateDecompress) {
      this.cache = /* @__PURE__ */ new Map();
      this.maxCacheEntries = maxCacheEntries;
      this.counter = 1;
      this.prefetch = prefetch;
      this.decompress = decompress;
    }
    getHeader(source, current_etag) {
      return __async2(this, null, function* () {
        const cacheKey = source.getKey();
        if (this.cache.has(cacheKey)) {
          this.cache.get(cacheKey).lastUsed = this.counter++;
          const data = yield this.cache.get(cacheKey).data;
          return data;
        }
        const p = new Promise((resolve, reject) => {
          getHeaderAndRoot(source, this.decompress, this.prefetch, current_etag).then((res) => {
            if (res[1]) {
              this.cache.set(res[1][0], {
                lastUsed: this.counter++,
                data: Promise.resolve(res[1][2])
              });
            }
            resolve(res[0]);
            this.prune();
          }).catch((e) => {
            reject(e);
          });
        });
        this.cache.set(cacheKey, { lastUsed: this.counter++, data: p });
        return p;
      });
    }
    getDirectory(source, offset, length, header) {
      return __async2(this, null, function* () {
        const cacheKey = source.getKey() + "|" + (header.etag || "") + "|" + offset + "|" + length;
        if (this.cache.has(cacheKey)) {
          this.cache.get(cacheKey).lastUsed = this.counter++;
          const data = yield this.cache.get(cacheKey).data;
          return data;
        }
        const p = new Promise((resolve, reject) => {
          getDirectory(source, this.decompress, offset, length, header).then((directory) => {
            resolve(directory);
            this.prune();
          }).catch((e) => {
            reject(e);
          });
        });
        this.cache.set(cacheKey, { lastUsed: this.counter++, data: p });
        return p;
      });
    }
    getArrayBuffer(source, offset, length, header) {
      return __async2(this, null, function* () {
        const cacheKey = source.getKey() + "|" + (header.etag || "") + "|" + offset + "|" + length;
        if (this.cache.has(cacheKey)) {
          this.cache.get(cacheKey).lastUsed = this.counter++;
          const data = yield this.cache.get(cacheKey).data;
          return data;
        }
        const p = new Promise((resolve, reject) => {
          source.getBytes(offset, length).then((resp) => {
            if (header.etag && header.etag !== resp.etag) {
              throw new EtagMismatch(resp.etag);
            }
            resolve(resp.data);
            if (this.cache.has(cacheKey)) {
            }
            this.prune();
          }).catch((e) => {
            reject(e);
          });
        });
        this.cache.set(cacheKey, { lastUsed: this.counter++, data: p });
        return p;
      });
    }
    prune() {
      if (this.cache.size >= this.maxCacheEntries) {
        let minUsed = Infinity;
        let minKey = void 0;
        this.cache.forEach(
          (cache_value, key) => {
            if (cache_value.lastUsed < minUsed) {
              minUsed = cache_value.lastUsed;
              minKey = key;
            }
          }
        );
        if (minKey) {
          this.cache.delete(minKey);
        }
      }
    }
    invalidate(source, current_etag) {
      return __async2(this, null, function* () {
        this.cache.delete(source.getKey());
        yield this.getHeader(source, current_etag);
      });
    }
  };
  var PMTiles = class {
    constructor(source, cache, decompress) {
      if (typeof source === "string") {
        this.source = new FetchSource(source);
      } else {
        this.source = source;
      }
      if (decompress) {
        this.decompress = decompress;
      } else {
        this.decompress = fflateDecompress;
      }
      if (cache) {
        this.cache = cache;
      } else {
        this.cache = new SharedPromiseCache();
      }
    }
    getHeader() {
      return __async2(this, null, function* () {
        return yield this.cache.getHeader(this.source);
      });
    }
    getZxyAttempt(z, x2, y, signal) {
      return __async2(this, null, function* () {
        const tile_id = zxyToTileId(z, x2, y);
        const header = yield this.cache.getHeader(this.source);
        if (header.specVersion < 3) {
          return v2_default.getZxy(header, this.source, this.cache, z, x2, y, signal);
        }
        if (z < header.minZoom || z > header.maxZoom) {
          return void 0;
        }
        let d_o = header.rootDirectoryOffset;
        let d_l = header.rootDirectoryLength;
        for (let depth = 0; depth <= 3; depth++) {
          const directory = yield this.cache.getDirectory(
            this.source,
            d_o,
            d_l,
            header
          );
          const entry = findTile(directory, tile_id);
          if (entry) {
            if (entry.runLength > 0) {
              const resp = yield this.source.getBytes(
                header.tileDataOffset + entry.offset,
                entry.length,
                signal
              );
              if (header.etag && header.etag !== resp.etag) {
                throw new EtagMismatch(resp.etag);
              }
              return {
                data: yield this.decompress(resp.data, header.tileCompression),
                cacheControl: resp.cacheControl,
                expires: resp.expires
              };
            } else {
              d_o = header.leafDirectoryOffset + entry.offset;
              d_l = entry.length;
            }
          } else {
            return void 0;
          }
        }
        throw Error("Maximum directory depth exceeded");
      });
    }
    getZxy(z, x2, y, signal) {
      return __async2(this, null, function* () {
        try {
          return yield this.getZxyAttempt(z, x2, y, signal);
        } catch (e) {
          if (e instanceof EtagMismatch) {
            this.cache.invalidate(this.source, e.message);
            return yield this.getZxyAttempt(z, x2, y, signal);
          } else {
            throw e;
          }
        }
      });
    }
    getMetadataAttempt() {
      return __async2(this, null, function* () {
        const header = yield this.cache.getHeader(this.source);
        const resp = yield this.source.getBytes(
          header.jsonMetadataOffset,
          header.jsonMetadataLength
        );
        if (header.etag && header.etag !== resp.etag) {
          throw new EtagMismatch(resp.etag);
        }
        const decompressed = yield this.decompress(
          resp.data,
          header.internalCompression
        );
        const dec = new TextDecoder("utf-8");
        return JSON.parse(dec.decode(decompressed));
      });
    }
    getMetadata() {
      return __async2(this, null, function* () {
        try {
          return yield this.getMetadataAttempt();
        } catch (e) {
          if (e instanceof EtagMismatch) {
            this.cache.invalidate(this.source, e.message);
            return yield this.getMetadataAttempt();
          } else {
            throw e;
          }
        }
      });
    }
  };

  // src/tilecache.ts
  var GeomType = /* @__PURE__ */ ((GeomType2) => {
    GeomType2[GeomType2["Point"] = 1] = "Point";
    GeomType2[GeomType2["Line"] = 2] = "Line";
    GeomType2[GeomType2["Polygon"] = 3] = "Polygon";
    return GeomType2;
  })(GeomType || {});
  function toIndex(c) {
    return `${c.x}:${c.y}:${c.z}`;
  }
  var loadGeomAndBbox = (pbf, geometry, scale) => {
    pbf.pos = geometry;
    const end = pbf.readVarint() + pbf.pos;
    let cmd = 1;
    let length = 0;
    let x2 = 0;
    let y = 0;
    let x1 = Infinity;
    let x22 = -Infinity;
    let y1 = Infinity;
    let y2 = -Infinity;
    const lines = [];
    let line = [];
    while (pbf.pos < end) {
      if (length <= 0) {
        const cmdLen = pbf.readVarint();
        cmd = cmdLen & 7;
        length = cmdLen >> 3;
      }
      length--;
      if (cmd === 1 || cmd === 2) {
        x2 += pbf.readSVarint() * scale;
        y += pbf.readSVarint() * scale;
        if (x2 < x1)
          x1 = x2;
        if (x2 > x22)
          x22 = x2;
        if (y < y1)
          y1 = y;
        if (y > y2)
          y2 = y;
        if (cmd === 1) {
          if (line.length > 0)
            lines.push(line);
          line = [];
        }
        line.push(new import_point_geometry2.default(x2, y));
      } else if (cmd === 7) {
        if (line)
          line.push(line[0].clone());
      } else
        throw new Error(`unknown command ${cmd}`);
    }
    if (line)
      lines.push(line);
    return { geom: lines, bbox: { minX: x1, minY: y1, maxX: x22, maxY: y2 } };
  };
  function parseTile(buffer, tileSize) {
    const v = new import_vector_tile.VectorTile(new import_pbf.default(buffer));
    const result = /* @__PURE__ */ new Map();
    for (const [key, value] of Object.entries(v.layers)) {
      const features = [];
      const layer = value;
      for (let i2 = 0; i2 < layer.length; i2++) {
        const loaded = loadGeomAndBbox(
          layer.feature(i2)._pbf,
          layer.feature(i2)._geometry,
          tileSize / layer.extent
        );
        let numVertices = 0;
        for (const part of loaded.geom)
          numVertices += part.length;
        features.push({
          id: layer.feature(i2).id,
          geomType: layer.feature(i2).type,
          geom: loaded.geom,
          numVertices,
          bbox: loaded.bbox,
          props: layer.feature(i2).properties
        });
      }
      result.set(key, features);
    }
    return result;
  }
  var PmtilesSource = class {
    constructor(url, shouldCancelZooms) {
      if (typeof url === "string") {
        this.p = new PMTiles(url);
      } else {
        this.p = url;
      }
      this.zoomaborts = [];
      this.shouldCancelZooms = shouldCancelZooms;
    }
    get(c, tileSize) {
      return __async(this, null, function* () {
        if (this.shouldCancelZooms) {
          this.zoomaborts = this.zoomaborts.filter((za) => {
            if (za.z !== c.z) {
              za.controller.abort();
              return false;
            }
            return true;
          });
        }
        const controller = new AbortController();
        this.zoomaborts.push({ z: c.z, controller });
        const signal = controller.signal;
        const result = yield this.p.getZxy(c.z, c.x, c.y, signal);
        if (result) {
          return parseTile(result.data, tileSize);
        }
        return /* @__PURE__ */ new Map();
      });
    }
  };
  var ZxySource = class {
    constructor(url, shouldCancelZooms) {
      this.url = url;
      this.zoomaborts = [];
      this.shouldCancelZooms = shouldCancelZooms;
    }
    get(c, tileSize) {
      return __async(this, null, function* () {
        if (this.shouldCancelZooms) {
          this.zoomaborts = this.zoomaborts.filter((za) => {
            if (za.z !== c.z) {
              za.controller.abort();
              return false;
            }
            return true;
          });
        }
        const url = this.url.replace("{z}", c.z.toString()).replace("{x}", c.x.toString()).replace("{y}", c.y.toString());
        const controller = new AbortController();
        this.zoomaborts.push({ z: c.z, controller });
        const signal = controller.signal;
        return new Promise((resolve, reject) => {
          fetch(url, { signal }).then((resp) => {
            return resp.arrayBuffer();
          }).then((buffer) => {
            const result = parseTile(buffer, tileSize);
            resolve(result);
          }).catch((e) => {
            reject(e);
          });
        });
      });
    }
  };
  var TileCache = class {
    constructor(source, tileSize) {
      this.source = source;
      this.cache = /* @__PURE__ */ new Map();
      this.inflight = /* @__PURE__ */ new Map();
      this.tileSize = tileSize;
    }
    get(c) {
      return __async(this, null, function* () {
        const idx = toIndex(c);
        return new Promise((resolve, reject) => {
          const entry = this.cache.get(idx);
          if (entry) {
            entry.used = performance.now();
            resolve(entry.data);
          } else {
            const ifentry = this.inflight.get(idx);
            if (ifentry) {
              ifentry.push({ resolve, reject });
            } else {
              this.inflight.set(idx, []);
              this.source.get(c, this.tileSize).then((tile) => {
                this.cache.set(idx, { used: performance.now(), data: tile });
                const ifentry2 = this.inflight.get(idx);
                if (ifentry2) {
                  for (const f of ifentry2) {
                    f.resolve(tile);
                  }
                }
                this.inflight.delete(idx);
                resolve(tile);
                if (this.cache.size >= 64) {
                  let minUsed = Infinity;
                  let minKey = void 0;
                  this.cache.forEach((value, key) => {
                    if (value.used < minUsed) {
                      minUsed = value.used;
                      minKey = key;
                    }
                  });
                  if (minKey)
                    this.cache.delete(minKey);
                }
              }).catch((e) => {
                const ifentry2 = this.inflight.get(idx);
                if (ifentry2) {
                  for (const f of ifentry2) {
                    f.reject(e);
                  }
                }
                this.inflight.delete(idx);
                reject(e);
              });
            }
          }
        });
      });
    }
  };

  // src/symbolizer.ts
  var Justify = /* @__PURE__ */ ((Justify2) => {
    Justify2[Justify2["Left"] = 1] = "Left";
    Justify2[Justify2["Center"] = 2] = "Center";
    Justify2[Justify2["Right"] = 3] = "Right";
    return Justify2;
  })(Justify || {});
  var TextPlacements = /* @__PURE__ */ ((TextPlacements2) => {
    TextPlacements2[TextPlacements2["N"] = 1] = "N";
    TextPlacements2[TextPlacements2["Ne"] = 2] = "Ne";
    TextPlacements2[TextPlacements2["E"] = 3] = "E";
    TextPlacements2[TextPlacements2["Se"] = 4] = "Se";
    TextPlacements2[TextPlacements2["S"] = 5] = "S";
    TextPlacements2[TextPlacements2["Sw"] = 6] = "Sw";
    TextPlacements2[TextPlacements2["W"] = 7] = "W";
    TextPlacements2[TextPlacements2["Nw"] = 8] = "Nw";
    return TextPlacements2;
  })(TextPlacements || {});
  var createPattern = (width, height, fn) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    if (ctx !== null)
      fn(canvas, ctx);
    return canvas;
  };
  var PolygonSymbolizer = class {
    constructor(options) {
      var _a2;
      this.pattern = options.pattern;
      this.fill = new StringAttr(options.fill, "black");
      this.opacity = new NumberAttr(options.opacity, 1);
      this.stroke = new StringAttr(options.stroke, "black");
      this.width = new NumberAttr(options.width, 0);
      this.perFeature = (_a2 = this.fill.perFeature || this.opacity.perFeature || this.stroke.perFeature || this.width.perFeature || options.perFeature) != null ? _a2 : false;
      this.doStroke = false;
    }
    before(ctx, z) {
      if (!this.perFeature) {
        ctx.globalAlpha = this.opacity.get(z);
        ctx.fillStyle = this.fill.get(z);
        ctx.strokeStyle = this.stroke.get(z);
        const width = this.width.get(z);
        if (width > 0)
          this.doStroke = true;
        ctx.lineWidth = width;
      }
      if (this.pattern) {
        const patten = ctx.createPattern(this.pattern, "repeat");
        if (patten)
          ctx.fillStyle = patten;
      }
    }
    draw(ctx, geom, z, f) {
      let doStroke = false;
      if (this.perFeature) {
        ctx.globalAlpha = this.opacity.get(z, f);
        ctx.fillStyle = this.fill.get(z, f);
        const width = this.width.get(z, f);
        if (width) {
          doStroke = true;
          ctx.strokeStyle = this.stroke.get(z, f);
          ctx.lineWidth = width;
        }
      }
      const drawPath = () => {
        ctx.fill();
        if (doStroke || this.doStroke) {
          ctx.stroke();
        }
      };
      ctx.beginPath();
      for (const poly of geom) {
        for (let p = 0; p < poly.length; p++) {
          const pt = poly[p];
          if (p === 0)
            ctx.moveTo(pt.x, pt.y);
          else
            ctx.lineTo(pt.x, pt.y);
        }
      }
      drawPath();
    }
  };
  function arr(base, a) {
    return (z) => {
      const b = z - base;
      if (b >= 0 && b < a.length) {
        return a[b];
      }
      return 0;
    };
  }
  function getStopIndex(input, stops) {
    let idx = 0;
    while (stops[idx + 1][0] < input)
      idx++;
    return idx;
  }
  function interpolate(factor, start, end) {
    return factor * (end - start) + start;
  }
  function computeInterpolationFactor(z, idx, base, stops) {
    const difference = stops[idx + 1][0] - stops[idx][0];
    const progress = z - stops[idx][0];
    if (difference === 0)
      return 0;
    if (base === 1)
      return progress / difference;
    return (__pow(base, progress) - 1) / (__pow(base, difference) - 1);
  }
  function exp(base, stops) {
    return (z) => {
      if (stops.length < 1)
        return 0;
      if (z <= stops[0][0])
        return stops[0][1];
      if (z >= stops[stops.length - 1][0])
        return stops[stops.length - 1][1];
      const idx = getStopIndex(z, stops);
      const factor = computeInterpolationFactor(z, idx, base, stops);
      return interpolate(factor, stops[idx][1], stops[idx + 1][1]);
    };
  }
  function step(output0, stops) {
    return (z) => {
      if (stops.length < 1)
        return 0;
      let retval = output0;
      for (let i2 = 0; i2 < stops.length; i2++) {
        if (z >= stops[i2][0])
          retval = stops[i2][1];
      }
      return retval;
    };
  }
  function linear(stops) {
    return exp(1, stops);
  }
  function cubicBezier(x1, y1, x2, y2, stops) {
    return (z) => {
      if (stops.length < 1)
        return 0;
      const bezier = new import_unitbezier.default(x1, y1, x2, y2);
      const idx = getStopIndex(z, stops);
      const factor = bezier.solve(computeInterpolationFactor(z, idx, 1, stops));
      return interpolate(factor, stops[idx][1], stops[idx + 1][1]);
    };
  }
  var LineSymbolizer = class {
    constructor(options) {
      var _a2;
      this.color = new StringAttr(options.color, "black");
      this.width = new NumberAttr(options.width);
      this.opacity = new NumberAttr(options.opacity);
      this.dash = options.dash ? new ArrayAttr(options.dash) : null;
      this.dashColor = new StringAttr(options.dashColor, "black");
      this.dashWidth = new NumberAttr(options.dashWidth, 1);
      this.lineCap = new StringAttr(options.lineCap, "butt");
      this.lineJoin = new StringAttr(options.lineJoin, "miter");
      this.skip = false;
      this.perFeature = !!(((_a2 = this.dash) == null ? void 0 : _a2.perFeature) || this.color.perFeature || this.opacity.perFeature || this.width.perFeature || this.lineCap.perFeature || this.lineJoin.perFeature || options.perFeature);
    }
    before(ctx, z) {
      if (!this.perFeature) {
        ctx.strokeStyle = this.color.get(z);
        ctx.lineWidth = this.width.get(z);
        ctx.globalAlpha = this.opacity.get(z);
        ctx.lineCap = this.lineCap.get(z);
        ctx.lineJoin = this.lineJoin.get(z);
      }
    }
    draw(ctx, geom, z, f) {
      if (this.skip)
        return;
      const strokePath = () => {
        if (this.perFeature) {
          ctx.globalAlpha = this.opacity.get(z, f);
          ctx.lineCap = this.lineCap.get(z, f);
          ctx.lineJoin = this.lineJoin.get(z, f);
        }
        if (this.dash) {
          ctx.save();
          if (this.perFeature) {
            ctx.lineWidth = this.dashWidth.get(z, f);
            ctx.strokeStyle = this.dashColor.get(z, f);
            ctx.setLineDash(this.dash.get(z, f));
          } else {
            ctx.setLineDash(this.dash.get(z));
          }
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.save();
          if (this.perFeature) {
            ctx.lineWidth = this.width.get(z, f);
            ctx.strokeStyle = this.color.get(z, f);
          }
          ctx.stroke();
          ctx.restore();
        }
      };
      ctx.beginPath();
      for (const ls of geom) {
        for (let p = 0; p < ls.length; p++) {
          const pt = ls[p];
          if (p === 0)
            ctx.moveTo(pt.x, pt.y);
          else
            ctx.lineTo(pt.x, pt.y);
        }
      }
      strokePath();
    }
  };
  var IconSymbolizer = class {
    constructor(options) {
      this.name = options.name;
      this.sheet = options.sheet;
      this.dpr = window.devicePixelRatio;
    }
    place(layout, geom, feature) {
      const pt = geom[0];
      const a = new import_point_geometry3.default(geom[0][0].x, geom[0][0].y);
      const loc = this.sheet.get(this.name);
      const width = loc.w / this.dpr;
      const height = loc.h / this.dpr;
      const bbox = {
        minX: a.x - width / 2,
        minY: a.y - height / 2,
        maxX: a.x + width / 2,
        maxY: a.y + height / 2
      };
      const draw = (ctx) => {
        ctx.globalAlpha = 1;
        ctx.drawImage(
          this.sheet.canvas,
          loc.x,
          loc.y,
          loc.w,
          loc.h,
          -loc.w / 2 / this.dpr,
          -loc.h / 2 / this.dpr,
          loc.w / 2,
          loc.h / 2
        );
      };
      return [{ anchor: a, bboxes: [bbox], draw }];
    }
  };
  var CircleSymbolizer = class {
    constructor(options) {
      this.radius = new NumberAttr(options.radius, 3);
      this.fill = new StringAttr(options.fill, "black");
      this.stroke = new StringAttr(options.stroke, "white");
      this.width = new NumberAttr(options.width, 0);
      this.opacity = new NumberAttr(options.opacity);
    }
    draw(ctx, geom, z, f) {
      ctx.globalAlpha = this.opacity.get(z, f);
      const radius = this.radius.get(z, f);
      const width = this.width.get(z, f);
      if (width > 0) {
        ctx.strokeStyle = this.stroke.get(z, f);
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.arc(geom[0][0].x, geom[0][0].y, radius + width / 2, 0, 2 * Math.PI);
        ctx.stroke();
      }
      ctx.fillStyle = this.fill.get(z, f);
      ctx.beginPath();
      ctx.arc(geom[0][0].x, geom[0][0].y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }
    place(layout, geom, feature) {
      const pt = geom[0];
      const a = new import_point_geometry3.default(geom[0][0].x, geom[0][0].y);
      const radius = this.radius.get(layout.zoom, feature);
      const bbox = {
        minX: a.x - radius,
        minY: a.y - radius,
        maxX: a.x + radius,
        maxY: a.y + radius
      };
      const draw = (ctx) => {
        this.draw(ctx, [[new import_point_geometry3.default(0, 0)]], layout.zoom, feature);
      };
      return [{ anchor: a, bboxes: [bbox], draw }];
    }
  };
  var ShieldSymbolizer = class {
    constructor(options) {
      this.font = new FontAttr(options);
      this.text = new TextAttr(options);
      this.fill = new StringAttr(options.fill, "black");
      this.background = new StringAttr(options.background, "white");
      this.padding = new NumberAttr(options.padding, 0);
    }
    place(layout, geom, f) {
      const property = this.text.get(layout.zoom, f);
      if (!property)
        return void 0;
      const font = this.font.get(layout.zoom, f);
      layout.scratch.font = font;
      const metrics = layout.scratch.measureText(property);
      const width = metrics.width;
      const ascent = metrics.actualBoundingBoxAscent;
      const descent = metrics.actualBoundingBoxDescent;
      const pt = geom[0];
      const a = new import_point_geometry3.default(geom[0][0].x, geom[0][0].y);
      const p = this.padding.get(layout.zoom, f);
      const bbox = {
        minX: a.x - width / 2 - p,
        minY: a.y - ascent - p,
        maxX: a.x + width / 2 + p,
        maxY: a.y + descent + p
      };
      const draw = (ctx) => {
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.background.get(layout.zoom, f);
        ctx.fillRect(
          -width / 2 - p,
          -ascent - p,
          width + 2 * p,
          ascent + descent + 2 * p
        );
        ctx.fillStyle = this.fill.get(layout.zoom, f);
        ctx.font = font;
        ctx.fillText(property, -width / 2, 0);
      };
      return [{ anchor: a, bboxes: [bbox], draw }];
    }
  };
  var FlexSymbolizer = class {
    constructor(list) {
      this.list = list;
    }
    place(layout, geom, feature) {
      let labels = this.list[0].place(layout, geom, feature);
      if (!labels)
        return void 0;
      let label = labels[0];
      const anchor = label.anchor;
      let bbox = label.bboxes[0];
      const height = bbox.maxY - bbox.minY;
      const draws = [{ draw: label.draw, translate: { x: 0, y: 0 } }];
      const newGeom = [[new import_point_geometry3.default(geom[0][0].x, geom[0][0].y + height)]];
      for (let i2 = 1; i2 < this.list.length; i2++) {
        labels = this.list[i2].place(layout, newGeom, feature);
        if (labels) {
          label = labels[0];
          bbox = mergeBbox(bbox, label.bboxes[0]);
          draws.push({ draw: label.draw, translate: { x: 0, y: height } });
        }
      }
      const draw = (ctx) => {
        for (const sub of draws) {
          ctx.save();
          ctx.translate(sub.translate.x, sub.translate.y);
          sub.draw(ctx);
          ctx.restore();
        }
      };
      return [{ anchor, bboxes: [bbox], draw }];
    }
  };
  var mergeBbox = (b1, b2) => {
    return {
      minX: Math.min(b1.minX, b2.minX),
      minY: Math.min(b1.minY, b2.minY),
      maxX: Math.max(b1.maxX, b2.maxX),
      maxY: Math.max(b1.maxY, b2.maxY)
    };
  };
  var GroupSymbolizer = class {
    constructor(list) {
      this.list = list;
    }
    place(layout, geom, feature) {
      const first = this.list[0];
      if (!first)
        return void 0;
      let labels = first.place(layout, geom, feature);
      if (!labels)
        return void 0;
      let label = labels[0];
      const anchor = label.anchor;
      let bbox = label.bboxes[0];
      const draws = [label.draw];
      for (let i2 = 1; i2 < this.list.length; i2++) {
        labels = this.list[i2].place(layout, geom, feature);
        if (!labels)
          return void 0;
        label = labels[0];
        bbox = mergeBbox(bbox, label.bboxes[0]);
        draws.push(label.draw);
      }
      const draw = (ctx) => {
        for (const d of draws) {
          d(ctx);
        }
      };
      return [{ anchor, bboxes: [bbox], draw }];
    }
  };
  var CenteredSymbolizer = class {
    constructor(symbolizer) {
      this.symbolizer = symbolizer;
    }
    place(layout, geom, feature) {
      const a = geom[0][0];
      const placed = this.symbolizer.place(layout, [[new import_point_geometry3.default(0, 0)]], feature);
      if (!placed || placed.length === 0)
        return void 0;
      const firstLabel = placed[0];
      const bbox = firstLabel.bboxes[0];
      const width = bbox.maxX - bbox.minX;
      const height = bbox.maxY - bbox.minY;
      const centered = {
        minX: a.x - width / 2,
        maxX: a.x + width / 2,
        minY: a.y - height / 2,
        maxY: a.y + height / 2
      };
      const draw = (ctx) => {
        ctx.translate(-width / 2, height / 2 - bbox.maxY);
        firstLabel.draw(ctx, { justify: 2 /* Center */ });
      };
      return [{ anchor: a, bboxes: [centered], draw }];
    }
  };
  var Padding = class {
    constructor(padding, symbolizer) {
      this.padding = new NumberAttr(padding, 0);
      this.symbolizer = symbolizer;
    }
    place(layout, geom, feature) {
      const placed = this.symbolizer.place(layout, geom, feature);
      if (!placed || placed.length === 0)
        return void 0;
      const padding = this.padding.get(layout.zoom, feature);
      for (const label of placed) {
        for (const bbox of label.bboxes) {
          bbox.minX -= padding;
          bbox.minY -= padding;
          bbox.maxX += padding;
          bbox.maxY += padding;
        }
      }
      return placed;
    }
  };
  var TextSymbolizer = class {
    constructor(options) {
      this.font = new FontAttr(options);
      this.text = new TextAttr(options);
      this.fill = new StringAttr(options.fill, "black");
      this.stroke = new StringAttr(options.stroke, "black");
      this.width = new NumberAttr(options.width, 0);
      this.lineHeight = new NumberAttr(options.lineHeight, 1);
      this.letterSpacing = new NumberAttr(options.letterSpacing, 0);
      this.maxLineCodeUnits = new NumberAttr(options.maxLineChars, 15);
      this.justify = options.justify;
    }
    place(layout, geom, feature) {
      const property = this.text.get(layout.zoom, feature);
      if (!property)
        return void 0;
      const font = this.font.get(layout.zoom, feature);
      layout.scratch.font = font;
      const letterSpacing = this.letterSpacing.get(layout.zoom, feature);
      const lines = linebreak(
        property,
        this.maxLineCodeUnits.get(layout.zoom, feature)
      );
      let longestLine = "";
      let longestLineLen = 0;
      for (const line of lines) {
        if (line.length > longestLineLen) {
          longestLineLen = line.length;
          longestLine = line;
        }
      }
      const metrics = layout.scratch.measureText(longestLine);
      const width = metrics.width + letterSpacing * (longestLineLen - 1);
      const ascent = metrics.actualBoundingBoxAscent;
      const descent = metrics.actualBoundingBoxDescent;
      const lineHeight = (ascent + descent) * this.lineHeight.get(layout.zoom, feature);
      const a = new import_point_geometry3.default(geom[0][0].x, geom[0][0].y);
      const bbox = {
        minX: a.x,
        minY: a.y - ascent,
        maxX: a.x + width,
        maxY: a.y + descent + (lines.length - 1) * lineHeight
      };
      const draw = (ctx, extra) => {
        ctx.globalAlpha = 1;
        ctx.font = font;
        ctx.fillStyle = this.fill.get(layout.zoom, feature);
        const textStrokeWidth = this.width.get(layout.zoom, feature);
        let y = 0;
        for (const line of lines) {
          let startX = 0;
          if (this.justify === 2 /* Center */ || extra && extra.justify === 2 /* Center */) {
            startX = (width - ctx.measureText(line).width) / 2;
          } else if (this.justify === 3 /* Right */ || extra && extra.justify === 3 /* Right */) {
            startX = width - ctx.measureText(line).width;
          }
          if (textStrokeWidth) {
            ctx.lineWidth = textStrokeWidth * 2;
            ctx.strokeStyle = this.stroke.get(layout.zoom, feature);
            if (letterSpacing > 0) {
              let xPos = startX;
              for (const letter of line) {
                ctx.strokeText(letter, xPos, y);
                xPos += ctx.measureText(letter).width + letterSpacing;
              }
            } else {
              ctx.strokeText(line, startX, y);
            }
          }
          if (letterSpacing > 0) {
            let xPos = startX;
            for (const letter of line) {
              ctx.fillText(letter, xPos, y);
              xPos += ctx.measureText(letter).width + letterSpacing;
            }
          } else {
            ctx.fillText(line, startX, y);
          }
          y += lineHeight;
        }
      };
      return [{ anchor: a, bboxes: [bbox], draw }];
    }
  };
  var CenteredTextSymbolizer = class {
    constructor(options) {
      this.centered = new CenteredSymbolizer(new TextSymbolizer(options));
    }
    place(layout, geom, feature) {
      return this.centered.place(layout, geom, feature);
    }
  };
  var OffsetSymbolizer = class {
    constructor(symbolizer, options) {
      var _a2, _b2, _c;
      this.symbolizer = symbolizer;
      this.offsetX = new NumberAttr(options.offsetX, 0);
      this.offsetY = new NumberAttr(options.offsetY, 0);
      this.justify = (_a2 = options.justify) != null ? _a2 : void 0;
      this.placements = (_b2 = options.placements) != null ? _b2 : [
        2 /* Ne */,
        6 /* Sw */,
        8 /* Nw */,
        4 /* Se */,
        1 /* N */,
        3 /* E */,
        5 /* S */,
        7 /* W */
      ];
      this.ddValues = (_c = options.ddValues) != null ? _c : () => {
        return {};
      };
    }
    place(layout, geom, feature) {
      if (feature.geomType !== 1 /* Point */)
        return void 0;
      const anchor = geom[0][0];
      const placed = this.symbolizer.place(layout, [[new import_point_geometry3.default(0, 0)]], feature);
      if (!placed || placed.length === 0)
        return void 0;
      const firstLabel = placed[0];
      const fb = firstLabel.bboxes[0];
      let offsetXvalue = this.offsetX;
      let offsetYvalue = this.offsetY;
      let justifyValue = this.justify;
      let placements = this.placements;
      const {
        offsetX: ddOffsetX,
        offsetY: ddOffsetY,
        justify: ddJustify,
        placements: ddPlacements
      } = this.ddValues(layout.zoom, feature) || {};
      if (ddOffsetX)
        offsetXvalue = new NumberAttr(ddOffsetX, 0);
      if (ddOffsetY)
        offsetYvalue = new NumberAttr(ddOffsetY, 0);
      if (ddJustify)
        justifyValue = ddJustify;
      if (ddPlacements)
        placements = ddPlacements;
      const offsetX = offsetXvalue.get(layout.zoom, feature);
      const offsetY = offsetYvalue.get(layout.zoom, feature);
      const getBbox = (a, o) => {
        return {
          minX: a.x + o.x + fb.minX,
          minY: a.y + o.y + fb.minY,
          maxX: a.x + o.x + fb.maxX,
          maxY: a.y + o.y + fb.maxY
        };
      };
      let origin = new import_point_geometry3.default(offsetX, offsetY);
      let justify;
      const draw = (ctx) => {
        ctx.translate(origin.x, origin.y);
        firstLabel.draw(ctx, { justify });
      };
      const placeLabelInPoint = (a, o) => {
        const bbox = getBbox(a, o);
        if (!layout.index.bboxCollides(bbox, layout.order))
          return [{ anchor, bboxes: [bbox], draw }];
      };
      for (const placement of placements) {
        const xAxisOffset = this.computeXaxisOffset(offsetX, fb, placement);
        const yAxisOffset = this.computeYaxisOffset(offsetY, fb, placement);
        justify = this.computeJustify(justifyValue, placement);
        origin = new import_point_geometry3.default(xAxisOffset, yAxisOffset);
        return placeLabelInPoint(anchor, origin);
      }
      return void 0;
    }
    computeXaxisOffset(offsetX, fb, placement) {
      const labelWidth = fb.maxX;
      const labelHalfWidth = labelWidth / 2;
      if ([1 /* N */, 5 /* S */].includes(placement))
        return offsetX - labelHalfWidth;
      if ([8 /* Nw */, 7 /* W */, 6 /* Sw */].includes(
        placement
      ))
        return offsetX - labelWidth;
      return offsetX;
    }
    computeYaxisOffset(offsetY, fb, placement) {
      const labelHalfHeight = Math.abs(fb.minY);
      const labelBottom = fb.maxY;
      const labelCenterHeight = (fb.minY + fb.maxY) / 2;
      if ([3 /* E */, 7 /* W */].includes(placement))
        return offsetY - labelCenterHeight;
      if ([8 /* Nw */, 2 /* Ne */, 1 /* N */].includes(
        placement
      ))
        return offsetY - labelBottom;
      if ([6 /* Sw */, 4 /* Se */, 5 /* S */].includes(
        placement
      ))
        return offsetY + labelHalfHeight;
      return offsetY;
    }
    computeJustify(fixedJustify, placement) {
      if (fixedJustify)
        return fixedJustify;
      if ([1 /* N */, 5 /* S */].includes(placement))
        return 2 /* Center */;
      if ([2 /* Ne */, 3 /* E */, 4 /* Se */].includes(
        placement
      ))
        return 1 /* Left */;
      return 3 /* Right */;
    }
  };
  var OffsetTextSymbolizer = class {
    constructor(options) {
      this.symbolizer = new OffsetSymbolizer(
        new TextSymbolizer(options),
        options
      );
    }
    place(layout, geom, feature) {
      return this.symbolizer.place(layout, geom, feature);
    }
  };
  var LineLabelPlacement = /* @__PURE__ */ ((LineLabelPlacement2) => {
    LineLabelPlacement2[LineLabelPlacement2["Above"] = 1] = "Above";
    LineLabelPlacement2[LineLabelPlacement2["Center"] = 2] = "Center";
    LineLabelPlacement2[LineLabelPlacement2["Below"] = 3] = "Below";
    return LineLabelPlacement2;
  })(LineLabelPlacement || {});
  var LineLabelSymbolizer = class {
    constructor(options) {
      var _a2;
      this.font = new FontAttr(options);
      this.text = new TextAttr(options);
      this.fill = new StringAttr(options.fill, "black");
      this.stroke = new StringAttr(options.stroke, "black");
      this.width = new NumberAttr(options.width, 0);
      this.offset = new NumberAttr(options.offset, 0);
      this.position = (_a2 = options.position) != null ? _a2 : 1 /* Above */;
      this.maxLabelCodeUnits = new NumberAttr(options.maxLabelChars, 40);
      this.repeatDistance = new NumberAttr(options.repeatDistance, 250);
    }
    place(layout, geom, feature) {
      const name = this.text.get(layout.zoom, feature);
      if (!name)
        return void 0;
      if (name.length > this.maxLabelCodeUnits.get(layout.zoom, feature))
        return void 0;
      const minLabelableDim = 20;
      const fbbox = feature.bbox;
      if (fbbox.maxY - fbbox.minY < minLabelableDim && fbbox.maxX - fbbox.minX < minLabelableDim)
        return void 0;
      const font = this.font.get(layout.zoom, feature);
      layout.scratch.font = font;
      const metrics = layout.scratch.measureText(name);
      const width = metrics.width;
      const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      let repeatDistance = this.repeatDistance.get(layout.zoom, feature);
      if (layout.overzoom > 4)
        repeatDistance *= 1 << layout.overzoom - 4;
      const cellSize = height * 2;
      const labelCandidates = simpleLabel(geom, width, repeatDistance, cellSize);
      if (labelCandidates.length === 0)
        return void 0;
      const labels = [];
      for (const candidate of labelCandidates) {
        const dx = candidate.end.x - candidate.start.x;
        const dy = candidate.end.y - candidate.start.y;
        const cells = lineCells(
          candidate.start,
          candidate.end,
          width,
          cellSize / 2
        );
        const bboxes = cells.map((c) => {
          return {
            minX: c.x - cellSize / 2,
            minY: c.y - cellSize / 2,
            maxX: c.x + cellSize / 2,
            maxY: c.y + cellSize / 2
          };
        });
        const draw = (ctx) => {
          ctx.globalAlpha = 1;
          ctx.rotate(Math.atan2(dy, dx));
          if (dx < 0) {
            ctx.scale(-1, -1);
            ctx.translate(-width, 0);
          }
          let heightPlacement = 0;
          if (this.position === 3 /* Below */)
            heightPlacement += height;
          else if (this.position === 2 /* Center */)
            heightPlacement += height / 2;
          ctx.translate(
            0,
            heightPlacement - this.offset.get(layout.zoom, feature)
          );
          ctx.font = font;
          const lineWidth = this.width.get(layout.zoom, feature);
          if (lineWidth) {
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = this.stroke.get(layout.zoom, feature);
            ctx.strokeText(name, 0, 0);
          }
          ctx.fillStyle = this.fill.get(layout.zoom, feature);
          ctx.fillText(name, 0, 0);
        };
        labels.push({
          anchor: candidate.start,
          bboxes,
          draw,
          deduplicationKey: name,
          deduplicationDistance: repeatDistance
        });
      }
      return labels;
    }
  };

  // src/default_style/style.ts
  var getString = (props, key) => {
    const val = props[key];
    if (typeof val === "string")
      return val;
    return "";
  };
  var getNumber = (props, key) => {
    const val = props[key];
    if (typeof val === "number")
      return val;
    return 0;
  };
  var paintRules = (t) => {
    return [
      {
        dataLayer: "earth",
        symbolizer: new PolygonSymbolizer({
          fill: t.earth
        })
      },
      {
        dataLayer: "landuse",
        symbolizer: new PolygonSymbolizer({
          fill: (z, f) => {
            return mix(t.park_a, t.park_b, Math.min(Math.max(z / 12, 12), 0));
          }
        }),
        filter: (z, f) => {
          const kind = getString(f.props, "pmap:kind");
          return ["allotments", "village_green", "playground"].includes(kind);
        }
      },
      {
        dataLayer: "landuse",
        symbolizer: new PolygonSymbolizer({
          fill: t.park_b,
          opacity: 0.7
        }),
        filter: (z, f) => {
          const kind = getString(f.props, "pmap:kind");
          return [
            "national_park",
            "park",
            "cemetery",
            "protected_area",
            "nature_reserve",
            "forest",
            "golf_course"
          ].includes(kind);
        }
      },
      {
        dataLayer: "landuse",
        symbolizer: new PolygonSymbolizer({
          fill: t.hospital
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "hospital";
        }
      },
      {
        dataLayer: "landuse",
        symbolizer: new PolygonSymbolizer({
          fill: t.industrial
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "industrial";
        }
      },
      {
        dataLayer: "landuse",
        symbolizer: new PolygonSymbolizer({
          fill: t.school
        }),
        filter: (z, f) => {
          const kind = getString(f.props, "pmap:kind");
          return ["school", "university", "college"].includes(kind);
        }
      },
      {
        dataLayer: "landuse",
        symbolizer: new PolygonSymbolizer({
          fill: t.beach
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "beach";
        }
      },
      {
        dataLayer: "landuse",
        symbolizer: new PolygonSymbolizer({
          fill: t.zoo
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "zoo";
        }
      },
      {
        dataLayer: "landuse",
        symbolizer: new PolygonSymbolizer({
          fill: t.zoo
        }),
        filter: (z, f) => {
          const kind = getString(f.props, "pmap:kind");
          return ["military", "naval_base", "airfield"].includes(kind);
        }
      },
      {
        dataLayer: "natural",
        symbolizer: new PolygonSymbolizer({
          fill: (z, f) => {
            return mix(t.wood_a, t.wood_b, Math.min(Math.max(z / 12, 12), 0));
          }
        }),
        filter: (z, f) => {
          const kind = getString(f.props, "pmap:kind");
          return ["wood", "nature_reserve", "forest"].includes(kind);
        }
      },
      {
        dataLayer: "natural",
        symbolizer: new PolygonSymbolizer({
          fill: (z, f) => {
            return mix(t.scrub_a, t.scrub_b, Math.min(Math.max(z / 12, 12), 0));
          }
        }),
        filter: (z, f) => {
          const kind = getString(f.props, "pmap:kind");
          return ["scrub", "grassland", "grass"].includes(kind);
        }
      },
      {
        dataLayer: "natural",
        symbolizer: new PolygonSymbolizer({
          fill: t.scrub_b
        }),
        filter: (z, f) => {
          const kind = getString(f.props, "pmap:kind");
          return ["scrub", "grassland", "grass"].includes(kind);
        }
      },
      {
        dataLayer: "natural",
        symbolizer: new PolygonSymbolizer({
          fill: t.glacier
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "glacier";
        }
      },
      {
        dataLayer: "natural",
        symbolizer: new PolygonSymbolizer({
          fill: t.sand
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "sand";
        }
      },
      {
        dataLayer: "landuse",
        symbolizer: new PolygonSymbolizer({
          fill: t.aerodrome
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "aerodrome";
        }
      },
      {
        dataLayer: "water",
        symbolizer: new PolygonSymbolizer({
          fill: t.water
        })
      },
      {
        dataLayer: "transit",
        symbolizer: new LineSymbolizer({
          color: t.runway,
          width: (z, f) => {
            return exp(1.6, [
              [11, 0],
              [13, 4],
              [19, 30]
            ])(z);
          }
        }),
        filter: (z, f) => {
          return f.props["pmap:kind_detail"] === "runway";
        }
      },
      {
        dataLayer: "transit",
        symbolizer: new LineSymbolizer({
          color: t.runway,
          width: (z, f) => {
            return exp(1.6, [
              [14, 0],
              [14.5, 1],
              [16, 6]
            ])(z);
          }
        }),
        filter: (z, f) => {
          return f.props["pmap:kind_detail"] === "taxiway";
        }
      },
      {
        dataLayer: "transit",
        symbolizer: new LineSymbolizer({
          color: t.pier,
          width: (z, f) => {
            return exp(1.6, [
              [13, 0],
              [13.5, 0, 5],
              [21, 16]
            ])(z);
          }
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "pier";
        }
      },
      {
        dataLayer: "physical_line",
        minzoom: 14,
        symbolizer: new LineSymbolizer({
          color: t.water,
          width: (z, f) => {
            return exp(1.6, [
              [9, 0],
              [9.5, 1],
              [18, 12]
            ])(z);
          }
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "river";
        }
      },
      {
        dataLayer: "physical_line",
        minzoom: 14,
        symbolizer: new LineSymbolizer({
          color: t.water,
          width: 0.5
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "stream";
        }
      },
      {
        dataLayer: "landuse",
        symbolizer: new PolygonSymbolizer({
          fill: t.pedestrian
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "pedestrian";
        }
      },
      {
        dataLayer: "landuse",
        symbolizer: new PolygonSymbolizer({
          fill: t.pier
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "pier";
        }
      },
      {
        dataLayer: "buildings",
        symbolizer: new PolygonSymbolizer({
          fill: t.buildings,
          opacity: 0.5
        })
      },
      {
        dataLayer: "roads",
        symbolizer: new LineSymbolizer({
          color: t.major,
          width: (z, f) => {
            return exp(1.6, [
              [14, 0],
              [20, 7]
            ])(z);
          }
        }),
        filter: (z, f) => {
          const kind = getString(f.props, "pmap:kind");
          return ["other", "path"].includes(kind);
        }
      },
      {
        dataLayer: "roads",
        symbolizer: new LineSymbolizer({
          color: t.major,
          width: (z, f) => {
            return exp(1.6, [
              [13, 0],
              [18, 8]
            ])(z);
          }
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "minor_road";
        }
      },
      {
        dataLayer: "roads",
        symbolizer: new LineSymbolizer({
          color: t.major,
          width: (z, f) => {
            return exp(1.6, [
              [7, 0],
              [12, 1.2],
              [15, 3],
              [18, 13]
            ])(z);
          }
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "medium_road";
        }
      },
      {
        dataLayer: "roads",
        symbolizer: new LineSymbolizer({
          color: t.major,
          width: (z, f) => {
            return exp(1.6, [
              [6, 0],
              [12, 1.6],
              [15, 3],
              [18, 13]
            ])(z);
          }
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "major_road";
        }
      },
      {
        dataLayer: "roads",
        symbolizer: new LineSymbolizer({
          color: t.major,
          width: (z, f) => {
            return exp(1.6, [
              [3, 0],
              [6, 1.1],
              [12, 1.6],
              [15, 5],
              [18, 15]
            ])(z);
          }
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "highway";
        }
      },
      {
        dataLayer: "boundaries",
        symbolizer: new LineSymbolizer({
          dash: [3, 2],
          color: t.boundaries,
          width: 1
        }),
        filter: (z, f) => {
          const minAdminLevel = f.props["pmap:min_admin_level"];
          return typeof minAdminLevel === "number" && minAdminLevel <= 2;
        }
      },
      {
        dataLayer: "transit",
        symbolizer: new LineSymbolizer({
          dash: [0.3, 0.75],
          color: t.railway,
          dashWidth: (z, f) => {
            return exp(1.6, [
              [4, 0],
              [7, 0.15],
              [19, 9]
            ])(z);
          },
          opacity: 0.5
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "rail";
        }
      },
      {
        dataLayer: "boundaries",
        symbolizer: new LineSymbolizer({
          dash: [3, 2],
          color: t.boundaries,
          width: 0.5
        }),
        filter: (z, f) => {
          const minAdminLevel = f.props["pmap:min_admin_level"];
          return typeof minAdminLevel === "number" && minAdminLevel > 2;
        }
      }
    ];
  };
  var labelRules = (t) => {
    const nametags = ["name"];
    return [
      {
        dataLayer: "roads",
        symbolizer: new LineLabelSymbolizer({
          labelProps: nametags,
          fill: t.roads_label_minor,
          font: "400 12px sans-serif",
          width: 2,
          stroke: t.roads_label_minor_halo
        }),
        minzoom: 16,
        filter: (z, f) => {
          const kind = getString(f.props, "pmap:kind");
          return ["minor_road", "other", "path"].includes(kind);
        }
      },
      {
        dataLayer: "roads",
        symbolizer: new LineLabelSymbolizer({
          labelProps: nametags,
          fill: t.roads_label_major,
          font: "400 12px sans-serif",
          width: 2,
          stroke: t.roads_label_major_halo
        }),
        minzoom: 12,
        filter: (z, f) => {
          const kind = getString(f.props, "pmap:kind");
          return ["highway", "major_road", "medium_road"].includes(kind);
        }
      },
      {
        dataLayer: "roads",
        symbolizer: new LineLabelSymbolizer({
          labelProps: nametags,
          fill: t.roads_label_major,
          font: "400 12px sans-serif",
          width: 2,
          stroke: t.roads_label_major_halo
        }),
        minzoom: 12,
        filter: (z, f) => {
          const kind = getString(f.props, "pmap:kind");
          return ["highway", "major_road", "medium_road"].includes(kind);
        }
      },
      {
        dataLayer: "physical_point",
        symbolizer: new CenteredTextSymbolizer({
          labelProps: nametags,
          fill: t.ocean_label,
          lineHeight: 1.5,
          letterSpacing: 1,
          font: (z, f) => {
            const size = linear([
              [3, 10],
              [10, 12]
            ])(z);
            return `400 ${size}px sans-serif`;
          },
          textTransform: "uppercase"
        }),
        filter: (z, f) => {
          const kind = getString(f.props, "pmap:kind");
          return ["ocean", "bay", "strait", "fjord"].includes(kind);
        }
      },
      {
        dataLayer: "physical_point",
        symbolizer: new CenteredTextSymbolizer({
          labelProps: nametags,
          fill: t.ocean_label,
          lineHeight: 1.5,
          letterSpacing: 1,
          font: (z, f) => {
            const size = linear([
              [3, 0],
              [6, 12],
              [10, 12]
            ])(z);
            return `400 ${size}px sans-serif`;
          }
        }),
        filter: (z, f) => {
          const kind = getString(f.props, "pmap:kind");
          return ["sea", "lake", "water"].includes(kind);
        }
      },
      {
        dataLayer: "places",
        symbolizer: new CenteredTextSymbolizer({
          labelProps: (z, f) => {
            if (z < 6) {
              return ["name:short"];
            }
            return nametags;
          },
          fill: t.state_label,
          stroke: t.state_label_halo,
          width: 1,
          lineHeight: 1.5,
          font: (z, f) => {
            if (z < 6)
              return "400 16px sans-serif";
            return "400 12px sans-serif";
          },
          textTransform: "uppercase"
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "region";
        }
      },
      {
        dataLayer: "places",
        symbolizer: new CenteredTextSymbolizer({
          labelProps: nametags,
          fill: t.country_label,
          lineHeight: 1.5,
          font: (z, f) => {
            if (z < 6)
              return "600 12px sans-serif";
            return "600 12px sans-serif";
          },
          textTransform: "uppercase"
        }),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "country";
        }
      },
      {
        dataLayer: "places",
        minzoom: 9,
        symbolizer: new CenteredTextSymbolizer({
          labelProps: nametags,
          fill: t.city_label,
          lineHeight: 1.5,
          font: (z, f) => {
            if (!f)
              return "400 12px sans-serif";
            const minZoom = f.props["pmap:min_zoom"];
            let weight = 400;
            if (minZoom && minZoom <= 5) {
              weight = 600;
            }
            let size = 12;
            const popRank = f.props["pmap:population_rank"];
            if (popRank && popRank > 9) {
              size = 16;
            }
            return `${weight} ${size}px sans-serif`;
          }
        }),
        sort: (a, b) => {
          const aRank = getNumber(a, "pmap:population_rank");
          const bRank = getNumber(b, "pmap:population_rank");
          return aRank - bRank;
        },
        filter: (z, f) => {
          return f.props["pmap:kind"] === "locality";
        }
      },
      {
        dataLayer: "places",
        maxzoom: 8,
        symbolizer: new GroupSymbolizer([
          new CircleSymbolizer({
            radius: 2,
            fill: t.city_circle,
            stroke: t.city_circle_stroke,
            width: 1.5
          }),
          new OffsetTextSymbolizer({
            labelProps: nametags,
            fill: t.city_label,
            stroke: t.city_label_halo,
            width: 1,
            offsetX: 6,
            offsetY: 4.5,
            font: (z, f) => {
              return "400 12px sans-serif";
            }
          })
        ]),
        filter: (z, f) => {
          return f.props["pmap:kind"] === "locality";
        }
      }
    ];
  };

  // src/default_style/themes.ts
  var LIGHT = {
    background: "#cccccc",
    earth: "#e0e0e0",
    park_a: "#cfddd5",
    park_b: "#9cd3b4",
    hospital: "#e4dad9",
    industrial: "#d1dde1",
    school: "#e4ded7",
    wood_a: "#d0ded0",
    wood_b: "#a0d9a0",
    pedestrian: "#e3e0d4",
    scrub_a: "#cedcd7",
    scrub_b: "#99d2bb",
    glacier: "#e7e7e7",
    sand: "#e2e0d7",
    beach: "#e8e4d0",
    aerodrome: "#dadbdf",
    runway: "#e9e9ed",
    water: "#80deea",
    pier: "#e0e0e0",
    zoo: "#c6dcdc",
    military: "#dcdcdc",
    tunnel_other_casing: "#e0e0e0",
    tunnel_minor_casing: "#e0e0e0",
    tunnel_link_casing: "#e0e0e0",
    tunnel_medium_casing: "#e0e0e0",
    tunnel_major_casing: "#e0e0e0",
    tunnel_highway_casing: "#e0e0e0",
    tunnel_other: "#d5d5d5",
    tunnel_minor: "#d5d5d5",
    tunnel_link: "#d5d5d5",
    tunnel_medium: "#d5d5d5",
    tunnel_major: "#d5d5d5",
    tunnel_highway: "#d5d5d5",
    transit_pier: "#e0e0e0",
    buildings: "#cccccc",
    minor_service_casing: "#e0e0e0",
    minor_casing: "#e0e0e0",
    link_casing: "#e0e0e0",
    medium_casing: "#e0e0e0",
    major_casing_late: "#e0e0e0",
    highway_casing_late: "#e0e0e0",
    other: "#ebebeb",
    minor_service: "#ebebeb",
    minor_a: "#ebebeb",
    minor_b: "#ffffff",
    link: "#ffffff",
    medium: "#f5f5f5",
    major_casing_early: "#e0e0e0",
    major: "#ffffff",
    highway_casing_early: "#e0e0e0",
    highway: "#ffffff",
    railway: "#a7b1b3",
    boundaries: "#adadad",
    waterway_label: "#ffffff",
    bridges_other_casing: "#e0e0e0",
    bridges_minor_casing: "#e0e0e0",
    bridges_link_casing: "#e0e0e0",
    bridges_medium_casing: "#e0e0e0",
    bridges_major_casing: "#e0e0e0",
    bridges_highway_casing: "#e0e0e0",
    bridges_other: "#ebebeb",
    bridges_minor: "#ffffff",
    bridges_link: "#ffffff",
    bridges_medium: "#f0eded",
    bridges_major: "#f5f5f5",
    bridges_highway: "#ffffff",
    roads_label_minor: "#91888b",
    roads_label_minor_halo: "#ffffff",
    roads_label_major: "#938a8d",
    roads_label_major_halo: "#ffffff",
    ocean_label: "#ffffff",
    peak_label: "#7e9aa0",
    subplace_label: "#8f8f8f",
    subplace_label_halo: "#e0e0e0",
    city_circle: "#ffffff",
    city_circle_stroke: "#a3a3a3",
    city_label: "#5c5c5c",
    city_label_halo: "#e0e0e0",
    state_label: "#b3b3b3",
    state_label_halo: "#e0e0e0",
    country_label: "#a3a3a3"
  };
  var DARK = {
    background: "#34373d",
    earth: "#1f1f1f",
    park_a: "#232325",
    park_b: "#232325",
    hospital: "#252424",
    industrial: "#222222",
    school: "#262323",
    wood_a: "#202121",
    wood_b: "#202121",
    pedestrian: "#1e1e1e",
    scrub_a: "#222323",
    scrub_b: "#222323",
    glacier: "#1c1c1c",
    sand: "#212123",
    beach: "#28282a",
    aerodrome: "#1e1e1e",
    runway: "#333333",
    water: "#34373d",
    pier: "#222222",
    zoo: "#222323",
    military: "#242323",
    tunnel_other_casing: "#141414",
    tunnel_minor_casing: "#141414",
    tunnel_link_casing: "#141414",
    tunnel_medium_casing: "#141414",
    tunnel_major_casing: "#141414",
    tunnel_highway_casing: "#141414",
    tunnel_other: "#292929",
    tunnel_minor: "#292929",
    tunnel_link: "#292929",
    tunnel_medium: "#292929",
    tunnel_major: "#292929",
    tunnel_highway: "#292929",
    transit_pier: "#333333",
    buildings: "#111111",
    minor_service_casing: "#1f1f1f",
    minor_casing: "#1f1f1f",
    link_casing: "#1f1f1f",
    medium_casing: "#1f1f1f",
    major_casing_late: "#1f1f1f",
    highway_casing_late: "#1f1f1f",
    other: "#333333",
    minor_service: "#333333",
    minor_a: "#3d3d3d",
    minor_b: "#333333",
    link: "#3d3d3d",
    medium: "#3d3d3d",
    major_casing_early: "#1f1f1f",
    major: "#3d3d3d",
    highway_casing_early: "#1f1f1f",
    highway: "#474747",
    railway: "#000000",
    boundaries: "#5b6374",
    waterway_label: "#717784",
    bridges_other_casing: "#2b2b2b",
    bridges_minor_casing: "#1f1f1f",
    bridges_link_casing: "#1f1f1f",
    bridges_medium_casing: "#1f1f1f",
    bridges_major_casing: "#1f1f1f",
    bridges_highway_casing: "#1f1f1f",
    bridges_other: "#333333",
    bridges_minor: "#333333",
    bridges_link: "#3d3d3d",
    bridges_medium: "#3d3d3d",
    bridges_major: "#3d3d3d",
    bridges_highway: "#474747",
    roads_label_minor: "#525252",
    roads_label_minor_halo: "#1f1f1f",
    roads_label_major: "#666666",
    roads_label_major_halo: "#1f1f1f",
    ocean_label: "#717784",
    peak_label: "#898080",
    subplace_label: "#525252",
    subplace_label_halo: "#1f1f1f",
    city_circle: "#000000",
    city_circle_stroke: "#7a7a7a",
    city_label: "#7a7a7a",
    city_label_halo: "#212121",
    state_label: "#3d3d3d",
    state_label_halo: "#1f1f1f",
    country_label: "#5c5c5c"
  };
  var WHITE = {
    background: "#ffffff",
    earth: "#ffffff",
    park_a: "#fcfcfc",
    park_b: "#fcfcfc",
    hospital: "#f8f8f8",
    industrial: "#fcfcfc",
    school: "#f8f8f8",
    wood_a: "#fafafa",
    wood_b: "#fafafa",
    pedestrian: "#fdfdfd",
    scrub_a: "#fafafa",
    scrub_b: "#fafafa",
    glacier: "#fcfcfc",
    sand: "#fafafa",
    beach: "#f6f6f6",
    aerodrome: "#fdfdfd",
    runway: "#efefef",
    water: "#dcdcdc",
    pier: "#f5f5f5",
    zoo: "#f7f7f7",
    military: "#fcfcfc",
    tunnel_other_casing: "#d6d6d6",
    tunnel_minor_casing: "#fcfcfc",
    tunnel_link_casing: "#fcfcfc",
    tunnel_medium_casing: "#fcfcfc",
    tunnel_major_casing: "#fcfcfc",
    tunnel_highway_casing: "#fcfcfc",
    tunnel_other: "#d6d6d6",
    tunnel_minor: "#d6d6d6",
    tunnel_link: "#d6d6d6",
    tunnel_medium: "#d6d6d6",
    tunnel_major: "#d6d6d6",
    tunnel_highway: "#d6d6d6",
    transit_pier: "#efefef",
    buildings: "#efefef",
    minor_service_casing: "#ffffff",
    minor_casing: "#ffffff",
    link_casing: "#ffffff",
    medium_casing: "#ffffff",
    major_casing_late: "#ffffff",
    highway_casing_late: "#ffffff",
    other: "#f5f5f5",
    minor_service: "#f5f5f5",
    minor_a: "#ebebeb",
    minor_b: "#f5f5f5",
    link: "#ebebeb",
    medium: "#ebebeb",
    major_casing_early: "#ffffff",
    major: "#ebebeb",
    highway_casing_early: "#ffffff",
    highway: "#ebebeb",
    railway: "#d6d6d6",
    boundaries: "#adadad",
    waterway_label: "#adadad",
    bridges_other_casing: "#ffffff",
    bridges_minor_casing: "#ffffff",
    bridges_link_casing: "#ffffff",
    bridges_medium_casing: "#ffffff",
    bridges_major_casing: "#ffffff",
    bridges_highway_casing: "#ffffff",
    bridges_other: "#f5f5f5",
    bridges_minor: "#f5f5f5",
    bridges_link: "#ebebeb",
    bridges_medium: "#ebebeb",
    bridges_major: "#ebebeb",
    bridges_highway: "#ebebeb",
    roads_label_minor: "#adadad",
    roads_label_minor_halo: "#ffffff",
    roads_label_major: "#999999",
    roads_label_major_halo: "#ffffff",
    ocean_label: "#adadad",
    peak_label: "#adadad",
    subplace_label: "#8f8f8f",
    subplace_label_halo: "#ffffff",
    city_circle: "#ffffff",
    city_circle_stroke: "#adadad",
    city_label: "#5c5c5c",
    city_label_halo: "#ffffff",
    state_label: "#b3b3b3",
    state_label_halo: "#ffffff",
    country_label: "#b8b8b8"
  };
  var GRAYSCALE = {
    background: "#a3a3a3",
    earth: "#cccccc",
    park_a: "#c2c2c2",
    park_b: "#c2c2c2",
    hospital: "#d0d0d0",
    industrial: "#c6c6c6",
    school: "#d0d0d0",
    wood_a: "#c2c2c2",
    wood_b: "#c2c2c2",
    pedestrian: "#c4c4c4",
    scrub_a: "#c2c2c2",
    scrub_b: "#c2c2c2",
    glacier: "#d2d2d2",
    sand: "#d2d2d2",
    beach: "#d2d2d2",
    aerodrome: "#c9c9c9",
    runway: "#f5f5f5",
    water: "#a3a3a3",
    pier: "#b8b8b8",
    zoo: "#c7c7c7",
    military: "#bfbfbf",
    tunnel_other_casing: "#b8b8b8",
    tunnel_minor_casing: "#b8b8b8",
    tunnel_link_casing: "#b8b8b8",
    tunnel_medium_casing: "#b8b8b8",
    tunnel_major_casing: "#b8b8b8",
    tunnel_highway_casing: "#b8b8b8",
    tunnel_other: "#d6d6d6",
    tunnel_minor: "#d6d6d6",
    tunnel_link: "#d6d6d6",
    tunnel_medium: "#d6d6d6",
    tunnel_major: "#d6d6d6",
    tunnel_highway: "#d6d6d6",
    transit_pier: "#b8b8b8",
    buildings: "#e0e0e0",
    minor_service_casing: "#cccccc",
    minor_casing: "#cccccc",
    link_casing: "#cccccc",
    medium_casing: "#cccccc",
    major_casing_late: "#cccccc",
    highway_casing_late: "#cccccc",
    other: "#e0e0e0",
    minor_service: "#e0e0e0",
    minor_a: "#ebebeb",
    minor_b: "#e0e0e0",
    link: "#ebebeb",
    medium: "#ebebeb",
    major_casing_early: "#cccccc",
    major: "#ebebeb",
    highway_casing_early: "#cccccc",
    highway: "#ebebeb",
    railway: "#f5f5f5",
    boundaries: "#5c5c5c",
    waterway_label: "#7a7a7a",
    bridges_other_casing: "#cccccc",
    bridges_minor_casing: "#cccccc",
    bridges_link_casing: "#cccccc",
    bridges_medium_casing: "#cccccc",
    bridges_major_casing: "#cccccc",
    bridges_highway_casing: "#cccccc",
    bridges_other: "#e0e0e0",
    bridges_minor: "#e0e0e0",
    bridges_link: "#ebebeb",
    bridges_medium: "#ebebeb",
    bridges_major: "#ebebeb",
    bridges_highway: "#ebebeb",
    roads_label_minor: "#999999",
    roads_label_minor_halo: "#e0e0e0",
    roads_label_major: "#8f8f8f",
    roads_label_major_halo: "#ebebeb",
    ocean_label: "#7a7a7a",
    peak_label: "#5c5c5c",
    subplace_label: "#7a7a7a",
    subplace_label_halo: "#cccccc",
    city_circle: "#c2c2c2",
    city_circle_stroke: "#7a7a7a",
    city_label: "#474747",
    city_label_halo: "#cccccc",
    state_label: "#999999",
    state_label_halo: "#cccccc",
    country_label: "#858585"
  };
  var BLACK = {
    background: "#2b2b2b",
    earth: "#141414",
    park_a: "#181818",
    park_b: "#181818",
    hospital: "#1d1d1d",
    industrial: "#101010",
    school: "#111111",
    wood_a: "#1a1a1a",
    wood_b: "#1a1a1a",
    pedestrian: "#191919",
    scrub_a: "#1c1c1c",
    scrub_b: "#1c1c1c",
    glacier: "#191919",
    sand: "#161616",
    beach: "#1f1f1f",
    aerodrome: "#191919",
    runway: "#323232",
    water: "#333333",
    pier: "#0a0a0a",
    zoo: "#191919",
    military: "#121212",
    tunnel_other_casing: "#101010",
    tunnel_minor_casing: "#101010",
    tunnel_link_casing: "#101010",
    tunnel_medium_casing: "#101010",
    tunnel_major_casing: "#101010",
    tunnel_highway_casing: "#101010",
    tunnel_other: "#292929",
    tunnel_minor: "#292929",
    tunnel_link: "#292929",
    tunnel_medium: "#292929",
    tunnel_major: "#292929",
    tunnel_highway: "#292929",
    transit_pier: "#0a0a0a",
    buildings: "#0a0a0a",
    minor_service_casing: "#141414",
    minor_casing: "#141414",
    link_casing: "#141414",
    medium_casing: "#141414",
    major_casing_late: "#141414",
    highway_casing_late: "#141414",
    other: "#1f1f1f",
    minor_service: "#1f1f1f",
    minor_a: "#292929",
    minor_b: "#1f1f1f",
    link: "#1f1f1f",
    medium: "#292929",
    major_casing_early: "#141414",
    major: "#292929",
    highway_casing_early: "#141414",
    highway: "#292929",
    railway: "#292929",
    boundaries: "#707070",
    waterway_label: "#707070",
    bridges_other_casing: "#141414",
    bridges_minor_casing: "#141414",
    bridges_link_casing: "#141414",
    bridges_medium_casing: "#141414",
    bridges_major_casing: "#141414",
    bridges_highway_casing: "#141414",
    bridges_other: "#1f1f1f",
    bridges_minor: "#1f1f1f",
    bridges_link: "#292929",
    bridges_medium: "#292929",
    bridges_major: "#292929",
    bridges_highway: "#292929",
    roads_label_minor: "#525252",
    roads_label_minor_halo: "#141414",
    roads_label_major: "#5c5c5c",
    roads_label_major_halo: "#141414",
    ocean_label: "#707070",
    peak_label: "#707070",
    subplace_label: "#5c5c5c",
    subplace_label_halo: "#141414",
    city_circle: "#000000",
    city_circle_stroke: "#666666",
    city_label: "#999999",
    city_label_halo: "#141414",
    state_label: "#3d3d3d",
    state_label_halo: "#141414",
    country_label: "#707070"
  };
  var themes = {
    light: LIGHT,
    dark: DARK,
    white: WHITE,
    grayscale: GRAYSCALE,
    black: BLACK
  };
  var themes_default = themes;

  // src/labeler.ts
  var import_point_geometry5 = __toESM(require_point_geometry());
  var import_rbush = __toESM(require_rbush_min());

  // src/view.ts
  var import_point_geometry4 = __toESM(require_point_geometry());
  var transformGeom = (geom, scale, translate) => {
    const retval = [];
    for (const arr2 of geom) {
      const loop = [];
      for (const coord of arr2) {
        loop.push(coord.clone().mult(scale).add(translate));
      }
      retval.push(loop);
    }
    return retval;
  };
  var wrap = (val, z) => {
    const dim = 1 << z;
    if (val < 0)
      return dim + val;
    if (val >= dim)
      return val % dim;
    return val;
  };
  var View = class {
    constructor(tileCache, maxDataLevel, levelDiff) {
      this.tileCache = tileCache;
      this.maxDataLevel = maxDataLevel;
      this.levelDiff = levelDiff;
    }
    dataTilesForBounds(displayZoom, bounds) {
      const fractional = __pow(2, displayZoom) / __pow(2, Math.ceil(displayZoom));
      const needed = [];
      let scale = 1;
      const dim = this.tileCache.tileSize;
      if (displayZoom < this.levelDiff) {
        scale = 1 / (1 << this.levelDiff - displayZoom) * fractional;
        needed.push({
          dataTile: { z: 0, x: 0, y: 0 },
          origin: new import_point_geometry4.default(0, 0),
          scale,
          dim: dim * scale
        });
      } else if (displayZoom <= this.levelDiff + this.maxDataLevel) {
        const f = 1 << this.levelDiff;
        const basetileSize = 256 * fractional;
        const dataZoom = Math.ceil(displayZoom) - this.levelDiff;
        const mintileX = Math.floor(bounds.minX / f / basetileSize);
        const mintileY = Math.floor(bounds.minY / f / basetileSize);
        const maxtileX = Math.floor(bounds.maxX / f / basetileSize);
        const maxtileY = Math.floor(bounds.maxY / f / basetileSize);
        for (let tx = mintileX; tx <= maxtileX; tx++) {
          for (let ty = mintileY; ty <= maxtileY; ty++) {
            const origin = new import_point_geometry4.default(
              tx * f * basetileSize,
              ty * f * basetileSize
            );
            needed.push({
              dataTile: {
                z: dataZoom,
                x: wrap(tx, dataZoom),
                y: wrap(ty, dataZoom)
              },
              origin,
              scale: fractional,
              dim: dim * fractional
            });
          }
        }
      } else {
        const f = 1 << this.levelDiff;
        scale = (1 << Math.ceil(displayZoom) - this.maxDataLevel - this.levelDiff) * fractional;
        const mintileX = Math.floor(bounds.minX / f / 256 / scale);
        const mintileY = Math.floor(bounds.minY / f / 256 / scale);
        const maxtileX = Math.floor(bounds.maxX / f / 256 / scale);
        const maxtileY = Math.floor(bounds.maxY / f / 256 / scale);
        for (let tx = mintileX; tx <= maxtileX; tx++) {
          for (let ty = mintileY; ty <= maxtileY; ty++) {
            const origin = new import_point_geometry4.default(tx * f * 256 * scale, ty * f * 256 * scale);
            needed.push({
              dataTile: {
                z: this.maxDataLevel,
                x: wrap(tx, this.maxDataLevel),
                y: wrap(ty, this.maxDataLevel)
              },
              origin,
              scale,
              dim: dim * scale
            });
          }
        }
      }
      return needed;
    }
    dataTileForDisplayTile(displayTile) {
      let dataTile;
      let scale = 1;
      let dim = this.tileCache.tileSize;
      let origin;
      if (displayTile.z < this.levelDiff) {
        dataTile = { z: 0, x: 0, y: 0 };
        scale = 1 / (1 << this.levelDiff - displayTile.z);
        origin = new import_point_geometry4.default(0, 0);
        dim = dim * scale;
      } else if (displayTile.z <= this.levelDiff + this.maxDataLevel) {
        const f = 1 << this.levelDiff;
        dataTile = {
          z: displayTile.z - this.levelDiff,
          x: Math.floor(displayTile.x / f),
          y: Math.floor(displayTile.y / f)
        };
        origin = new import_point_geometry4.default(dataTile.x * f * 256, dataTile.y * f * 256);
      } else {
        scale = 1 << displayTile.z - this.maxDataLevel - this.levelDiff;
        const f = 1 << this.levelDiff;
        dataTile = {
          z: this.maxDataLevel,
          x: Math.floor(displayTile.x / f / scale),
          y: Math.floor(displayTile.y / f / scale)
        };
        origin = new import_point_geometry4.default(
          dataTile.x * f * scale * 256,
          dataTile.y * f * scale * 256
        );
        dim = dim * scale;
      }
      return { dataTile, scale, origin, dim };
    }
    getBbox(displayZoom, bounds) {
      return __async(this, null, function* () {
        const needed = this.dataTilesForBounds(displayZoom, bounds);
        const result = yield Promise.all(
          needed.map((tt) => this.tileCache.get(tt.dataTile))
        );
        return result.map((data, i2) => {
          const tt = needed[i2];
          return {
            data,
            z: displayZoom,
            dataTile: tt.dataTile,
            scale: tt.scale,
            dim: tt.dim,
            origin: tt.origin
          };
        });
      });
    }
    getDisplayTile(displayTile) {
      return __async(this, null, function* () {
        const tt = this.dataTileForDisplayTile(displayTile);
        const data = yield this.tileCache.get(tt.dataTile);
        return {
          data,
          z: displayTile.z,
          dataTile: tt.dataTile,
          scale: tt.scale,
          origin: tt.origin,
          dim: tt.dim
        };
      });
    }
  };
  var sourcesToViews = (options) => {
    const sourceToViews = (o) => {
      const levelDiff = o.levelDiff === void 0 ? 1 : o.levelDiff;
      const maxDataZoom = o.maxDataZoom || 15;
      let source;
      if (typeof o.url === "string") {
        if (o.url.endsWith(".pmtiles")) {
          source = new PmtilesSource(o.url, true);
        } else {
          source = new ZxySource(o.url, true);
        }
      } else if (o.url) {
        source = new PmtilesSource(o.url, true);
      } else {
        throw new Error(`Invalid source ${o.url}`);
      }
      const cache = new TileCache(source, 256 * 1 << levelDiff);
      return new View(cache, maxDataZoom, levelDiff);
    };
    const sources = /* @__PURE__ */ new Map();
    if (options.sources) {
      for (const key in options.sources) {
        sources.set(key, sourceToViews(options.sources[key]));
      }
    } else {
      sources.set("", sourceToViews(options));
    }
    return sources;
  };

  // src/labeler.ts
  var covering = (displayZoom, tileWidth, bbox) => {
    const res = 256;
    const f = tileWidth / res;
    const minx = Math.floor(bbox.minX / res);
    const miny = Math.floor(bbox.minY / res);
    const maxx = Math.floor(bbox.maxX / res);
    const maxy = Math.floor(bbox.maxY / res);
    const leveldiff = Math.log2(f);
    const retval = [];
    for (let x2 = minx; x2 <= maxx; x2++) {
      const wrappedX = x2 % (1 << displayZoom);
      for (let y = miny; y <= maxy; y++) {
        retval.push({
          display: toIndex({ z: displayZoom, x: wrappedX, y }),
          key: toIndex({
            z: displayZoom - leveldiff,
            x: Math.floor(wrappedX / f),
            y: Math.floor(y / f)
          })
        });
      }
    }
    return retval;
  };
  var Index = class {
    constructor(dim, maxLabeledTiles) {
      this.tree = new import_rbush.default();
      this.current = /* @__PURE__ */ new Map();
      this.dim = dim;
      this.maxLabeledTiles = maxLabeledTiles;
    }
    hasPrefix(tileKey) {
      for (const key of this.current.keys()) {
        if (key.startsWith(tileKey))
          return true;
      }
      return false;
    }
    has(tileKey) {
      return this.current.has(tileKey);
    }
    size() {
      return this.current.size;
    }
    keys() {
      return this.current.keys();
    }
    searchBbox(bbox, order) {
      const labels = /* @__PURE__ */ new Set();
      for (const match of this.tree.search(bbox)) {
        if (match.indexedLabel.order <= order) {
          labels.add(match.indexedLabel);
        }
      }
      return labels;
    }
    searchLabel(label, order) {
      const labels = /* @__PURE__ */ new Set();
      for (const bbox of label.bboxes) {
        for (const match of this.tree.search(bbox)) {
          if (match.indexedLabel.order <= order) {
            labels.add(match.indexedLabel);
          }
        }
      }
      return labels;
    }
    bboxCollides(bbox, order) {
      for (const match of this.tree.search(bbox)) {
        if (match.indexedLabel.order <= order)
          return true;
      }
      return false;
    }
    labelCollides(label, order) {
      for (const bbox of label.bboxes) {
        for (const match of this.tree.search(bbox)) {
          if (match.indexedLabel.order <= order)
            return true;
        }
      }
      return false;
    }
    deduplicationCollides(label) {
      if (!label.deduplicationKey || !label.deduplicationDistance)
        return false;
      const dist = label.deduplicationDistance;
      const testBbox = {
        minX: label.anchor.x - dist,
        minY: label.anchor.y - dist,
        maxX: label.anchor.x + dist,
        maxY: label.anchor.y + dist
      };
      for (const collision of this.tree.search(testBbox)) {
        if (collision.indexedLabel.deduplicationKey === label.deduplicationKey) {
          if (collision.indexedLabel.anchor.dist(label.anchor) < dist) {
            return true;
          }
        }
      }
      return false;
    }
    makeEntry(tileKey) {
      if (this.current.get(tileKey)) {
        console.log("consistency error 1");
      }
      const newSet = /* @__PURE__ */ new Set();
      this.current.set(tileKey, newSet);
    }
    insert(label, order, tileKey) {
      const indexedLabel = {
        anchor: label.anchor,
        bboxes: label.bboxes,
        draw: label.draw,
        order,
        tileKey,
        deduplicationKey: label.deduplicationKey,
        deduplicationDistance: label.deduplicationDistance
      };
      let entry = this.current.get(tileKey);
      if (!entry) {
        const newSet = /* @__PURE__ */ new Set();
        this.current.set(tileKey, newSet);
        entry = newSet;
      }
      entry.add(indexedLabel);
      let wrapsLeft = false;
      let wrapsRight = false;
      for (const bbox of label.bboxes) {
        this.tree.insert({
          minX: bbox.minX,
          minY: bbox.minY,
          maxX: bbox.maxX,
          maxY: bbox.maxY,
          indexedLabel
        });
        if (bbox.minX < 0)
          wrapsLeft = true;
        if (bbox.maxX > this.dim)
          wrapsRight = true;
      }
      if (wrapsLeft || wrapsRight) {
        const shift2 = wrapsLeft ? this.dim : -this.dim;
        const newBboxes = [];
        for (const bbox of label.bboxes) {
          newBboxes.push({
            minX: bbox.minX + shift2,
            minY: bbox.minY,
            maxX: bbox.maxX + shift2,
            maxY: bbox.maxY
          });
        }
        const duplicateLabel = {
          anchor: new import_point_geometry5.default(label.anchor.x + shift2, label.anchor.y),
          bboxes: newBboxes,
          draw: label.draw,
          order,
          tileKey
        };
        const entry2 = this.current.get(tileKey);
        if (entry2)
          entry2.add(duplicateLabel);
        for (const bbox of newBboxes) {
          this.tree.insert({
            minX: bbox.minX,
            minY: bbox.minY,
            maxX: bbox.maxX,
            maxY: bbox.maxY,
            indexedLabel: duplicateLabel
          });
        }
      }
    }
    pruneOrNoop(keyAdded) {
      const added = keyAdded.split(":");
      let maxKey = void 0;
      let maxDist = 0;
      let keysForDs = 0;
      for (const existingKey of this.current.keys()) {
        const existing = existingKey.split(":");
        if (existing[3] === added[3]) {
          keysForDs++;
          const dist = Math.sqrt(
            __pow(+existing[0] - +added[0], 2) + __pow(+existing[1] - +added[1], 2)
          );
          if (dist > maxDist) {
            maxDist = dist;
            maxKey = existingKey;
          }
        }
        if (maxKey && keysForDs > this.maxLabeledTiles) {
          this.pruneKey(maxKey);
        }
      }
    }
    pruneKey(keyToRemove) {
      const indexedLabels = this.current.get(keyToRemove);
      if (!indexedLabels)
        return;
      const entriesToDelete = [];
      for (const entry of this.tree.all()) {
        if (indexedLabels.has(entry.indexedLabel)) {
          entriesToDelete.push(entry);
        }
      }
      for (const entry of entriesToDelete) {
        this.tree.remove(entry);
      }
      this.current.delete(keyToRemove);
    }
    removeLabel(labelToRemove) {
      const entriesToDelete = [];
      for (const entry of this.tree.all()) {
        if (labelToRemove === entry.indexedLabel) {
          entriesToDelete.push(entry);
        }
      }
      for (const entry of entriesToDelete) {
        this.tree.remove(entry);
      }
      const c = this.current.get(labelToRemove.tileKey);
      if (c)
        c.delete(labelToRemove);
    }
  };
  var Labeler = class {
    constructor(z, scratch, labelRules2, maxLabeledTiles, callback) {
      this.index = new Index(256 * 1 << z, maxLabeledTiles);
      this.z = z;
      this.scratch = scratch;
      this.labelRules = labelRules2;
      this.callback = callback;
    }
    layout(preparedTilemap) {
      const start = performance.now();
      const keysAdding = /* @__PURE__ */ new Set();
      for (const [k, preparedTiles] of preparedTilemap) {
        for (const preparedTile of preparedTiles) {
          const key = `${toIndex(preparedTile.dataTile)}:${k}`;
          if (!this.index.has(key)) {
            this.index.makeEntry(key);
            keysAdding.add(key);
          }
        }
      }
      const tilesInvalidated = /* @__PURE__ */ new Set();
      for (const [order, rule] of this.labelRules.entries()) {
        if (rule.visible === false)
          continue;
        if (rule.minzoom && this.z < rule.minzoom)
          continue;
        if (rule.maxzoom && this.z > rule.maxzoom)
          continue;
        const dsName = rule.dataSource || "";
        const preparedTiles = preparedTilemap.get(dsName);
        if (!preparedTiles)
          continue;
        for (const preparedTile of preparedTiles) {
          const key = `${toIndex(preparedTile.dataTile)}:${dsName}`;
          if (!keysAdding.has(key))
            continue;
          const layer = preparedTile.data.get(rule.dataLayer);
          if (layer === void 0)
            continue;
          const feats = layer;
          if (rule.sort)
            feats.sort((a, b) => {
              if (rule.sort) {
                return rule.sort(a.props, b.props);
              }
              return 0;
            });
          const layout = {
            index: this.index,
            zoom: this.z,
            scratch: this.scratch,
            order,
            overzoom: this.z - preparedTile.dataTile.z
          };
          for (const feature of feats) {
            if (rule.filter && !rule.filter(this.z, feature))
              continue;
            const transformed = transformGeom(
              feature.geom,
              preparedTile.scale,
              preparedTile.origin
            );
            const labels = rule.symbolizer.place(layout, transformed, feature);
            if (!labels)
              continue;
            for (const label of labels) {
              let labelAdded = false;
              if (label.deduplicationKey && this.index.deduplicationCollides(label)) {
                continue;
              }
              if (this.index.labelCollides(label, Infinity)) {
                if (!this.index.labelCollides(label, order)) {
                  const conflicts = this.index.searchLabel(label, Infinity);
                  for (const conflict of conflicts) {
                    this.index.removeLabel(conflict);
                    for (const bbox of conflict.bboxes) {
                      this.findInvalidatedTiles(
                        tilesInvalidated,
                        preparedTile.dim,
                        bbox,
                        key
                      );
                    }
                  }
                  this.index.insert(label, order, key);
                  labelAdded = true;
                }
              } else {
                this.index.insert(label, order, key);
                labelAdded = true;
              }
              if (labelAdded) {
                for (const bbox of label.bboxes) {
                  if (bbox.maxX > preparedTile.origin.x + preparedTile.dim || bbox.minX < preparedTile.origin.x || bbox.minY < preparedTile.origin.y || bbox.maxY > preparedTile.origin.y + preparedTile.dim) {
                    this.findInvalidatedTiles(
                      tilesInvalidated,
                      preparedTile.dim,
                      bbox,
                      key
                    );
                  }
                }
              }
            }
          }
        }
      }
      for (const key of keysAdding) {
        this.index.pruneOrNoop(key);
      }
      if (tilesInvalidated.size > 0 && this.callback) {
        this.callback(tilesInvalidated);
      }
      return performance.now() - start;
    }
    findInvalidatedTiles(tilesInvalidated, dim, bbox, key) {
      const touched = covering(this.z, dim, bbox);
      for (const s of touched) {
        if (s.key !== key && this.index.hasPrefix(s.key)) {
          tilesInvalidated.add(s.display);
        }
      }
    }
    add(preparedTilemap) {
      let allAdded = true;
      for (const [k, preparedTiles] of preparedTilemap) {
        for (const preparedTile of preparedTiles) {
          if (!this.index.has(`${toIndex(preparedTile.dataTile)}:${k}`))
            allAdded = false;
        }
      }
      if (allAdded) {
        return 0;
      }
      const timing = this.layout(preparedTilemap);
      return timing;
    }
  };
  var Labelers = class {
    constructor(scratch, labelRules2, maxLabeledTiles, callback) {
      this.labelers = /* @__PURE__ */ new Map();
      this.scratch = scratch;
      this.labelRules = labelRules2;
      this.maxLabeledTiles = maxLabeledTiles;
      this.callback = callback;
    }
    add(z, preparedTilemap) {
      let labeler = this.labelers.get(z);
      if (labeler) {
        return labeler.add(preparedTilemap);
      }
      labeler = new Labeler(
        z,
        this.scratch,
        this.labelRules,
        this.maxLabeledTiles,
        this.callback
      );
      this.labelers.set(z, labeler);
      return labeler.add(preparedTilemap);
    }
    getIndex(z) {
      const labeler = this.labelers.get(z);
      if (labeler)
        return labeler.index;
    }
  };

  // src/painter.ts
  var import_point_geometry6 = __toESM(require_point_geometry());
  function paint(ctx, z, preparedTilemap, labelData, rules, bbox, origin, clip, debug) {
    const start = performance.now();
    ctx.save();
    ctx.miterLimit = 2;
    for (const rule of rules) {
      if (rule.minzoom && z < rule.minzoom)
        continue;
      if (rule.maxzoom && z > rule.maxzoom)
        continue;
      const preparedTiles = preparedTilemap.get(rule.dataSource || "");
      if (!preparedTiles)
        continue;
      for (const preparedTile of preparedTiles) {
        const layer = preparedTile.data.get(rule.dataLayer);
        if (layer === void 0)
          continue;
        if (rule.symbolizer.before)
          rule.symbolizer.before(ctx, preparedTile.z);
        const po = preparedTile.origin;
        const dim = preparedTile.dim;
        const ps = preparedTile.scale;
        ctx.save();
        if (clip) {
          ctx.beginPath();
          const minX = Math.max(po.x - origin.x, bbox.minX - origin.x);
          const minY = Math.max(po.y - origin.y, bbox.minY - origin.y);
          const maxX = Math.min(po.x - origin.x + dim, bbox.maxX - origin.x);
          const maxY = Math.min(po.y - origin.y + dim, bbox.maxY - origin.y);
          ctx.rect(minX, minY, maxX - minX, maxY - minY);
          ctx.clip();
        }
        ctx.translate(po.x - origin.x, po.y - origin.y);
        for (const feature of layer) {
          let geom = feature.geom;
          const fbox = feature.bbox;
          if (fbox.maxX * ps + po.x < bbox.minX || fbox.minX * ps + po.x > bbox.maxX || fbox.minY * ps + po.y > bbox.maxY || fbox.maxY * ps + po.y < bbox.minY) {
            continue;
          }
          if (rule.filter && !rule.filter(preparedTile.z, feature))
            continue;
          if (ps !== 1) {
            geom = transformGeom(geom, ps, new import_point_geometry6.default(0, 0));
          }
          rule.symbolizer.draw(ctx, geom, preparedTile.z, feature);
        }
        ctx.restore();
      }
    }
    if (clip) {
      ctx.beginPath();
      ctx.rect(
        bbox.minX - origin.x,
        bbox.minY - origin.y,
        bbox.maxX - bbox.minX,
        bbox.maxY - bbox.minY
      );
      ctx.clip();
    }
    if (labelData) {
      const matches = labelData.searchBbox(bbox, Infinity);
      for (const label of matches) {
        ctx.save();
        ctx.translate(label.anchor.x - origin.x, label.anchor.y - origin.y);
        label.draw(ctx);
        ctx.restore();
        if (debug) {
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = debug;
          ctx.fillStyle = debug;
          ctx.globalAlpha = 1;
          ctx.fillRect(
            label.anchor.x - origin.x - 2,
            label.anchor.y - origin.y - 2,
            4,
            4
          );
          for (const bbox2 of label.bboxes) {
            ctx.strokeRect(
              bbox2.minX - origin.x,
              bbox2.minY - origin.y,
              bbox2.maxX - bbox2.minX,
              bbox2.maxY - bbox2.minY
            );
          }
        }
      }
    }
    ctx.restore();
    return performance.now() - start;
  }

  // src/frontends/static.ts
  var R = 6378137;
  var MAX_LATITUDE = 85.0511287798;
  var MAXCOORD = R * Math.PI;
  var project = (latlng) => {
    const d = Math.PI / 180;
    const constrainedLat = Math.max(
      Math.min(MAX_LATITUDE, latlng.y),
      -MAX_LATITUDE
    );
    const sin = Math.sin(constrainedLat * d);
    return new import_point_geometry7.default(R * latlng.x * d, R * Math.log((1 + sin) / (1 - sin)) / 2);
  };
  var unproject = (point) => {
    const d = 180 / Math.PI;
    return {
      lat: (2 * Math.atan(Math.exp(point.y / R)) - Math.PI / 2) * d,
      lng: point.x * d / R
    };
  };
  var instancedProject = (origin, displayZoom) => {
    return (latlng) => {
      const projected = project(latlng);
      const normalized = new import_point_geometry7.default(
        (projected.x + MAXCOORD) / (MAXCOORD * 2),
        1 - (projected.y + MAXCOORD) / (MAXCOORD * 2)
      );
      return normalized.mult((1 << displayZoom) * 256).sub(origin);
    };
  };
  var instancedUnproject = (origin, displayZoom) => {
    return (point) => {
      const normalized = new import_point_geometry7.default(point.x, point.y).add(origin).div((1 << displayZoom) * 256);
      const projected = new import_point_geometry7.default(
        normalized.x * (MAXCOORD * 2) - MAXCOORD,
        (1 - normalized.y) * (MAXCOORD * 2) - MAXCOORD
      );
      return unproject(projected);
    };
  };
  var getZoom = (degreesLng, cssPixels) => {
    const d = cssPixels * (360 / degreesLng);
    return Math.log2(d / 256);
  };
  var Static = class {
    constructor(options) {
      if (options.theme) {
        const theme = themes_default[options.theme];
        this.paintRules = paintRules(theme);
        this.labelRules = labelRules(theme);
        this.backgroundColor = theme.background;
      } else {
        this.paintRules = options.paintRules || [];
        this.labelRules = options.labelRules || [];
        this.backgroundColor = options.backgroundColor;
      }
      this.views = sourcesToViews(options);
      this.debug = options.debug || "";
    }
    drawContext(ctx, width, height, latlng, displayZoom) {
      return __async(this, null, function* () {
        const center = project(latlng);
        const normalizedCenter = new import_point_geometry7.default(
          (center.x + MAXCOORD) / (MAXCOORD * 2),
          1 - (center.y + MAXCOORD) / (MAXCOORD * 2)
        );
        const origin = normalizedCenter.clone().mult(__pow(2, displayZoom) * 256).sub(new import_point_geometry7.default(width / 2, height / 2));
        const bbox = {
          minX: origin.x,
          minY: origin.y,
          maxX: origin.x + width,
          maxY: origin.y + height
        };
        const promises = [];
        for (const [k, v] of this.views) {
          const promise = v.getBbox(displayZoom, bbox);
          promises.push({ key: k, promise });
        }
        const tileResponses = yield Promise.all(
          promises.map((o) => {
            return o.promise.then(
              (v) => {
                return { status: "fulfilled", value: v, key: o.key };
              },
              (error) => {
                return { status: "rejected", value: [], reason: error, key: o.key };
              }
            );
          })
        );
        const preparedTilemap = /* @__PURE__ */ new Map();
        for (const tileResponse of tileResponses) {
          if (tileResponse.status === "fulfilled") {
            preparedTilemap.set(tileResponse.key, tileResponse.value);
          }
        }
        const start = performance.now();
        const labeler = new Labeler(
          displayZoom,
          ctx,
          this.labelRules,
          16,
          void 0
        );
        const layoutTime = labeler.add(preparedTilemap);
        if (this.backgroundColor) {
          ctx.save();
          ctx.fillStyle = this.backgroundColor;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }
        const paintRules2 = this.paintRules;
        const p = paint(
          ctx,
          displayZoom,
          preparedTilemap,
          labeler.index,
          paintRules2,
          bbox,
          origin,
          true,
          this.debug
        );
        if (this.debug) {
          ctx.save();
          ctx.translate(-origin.x, -origin.y);
          ctx.strokeStyle = this.debug;
          ctx.fillStyle = this.debug;
          ctx.font = "12px sans-serif";
          let idx = 0;
          for (const [k, v] of preparedTilemap) {
            for (const preparedTile of v) {
              ctx.strokeRect(
                preparedTile.origin.x,
                preparedTile.origin.y,
                preparedTile.dim,
                preparedTile.dim
              );
              const dt = preparedTile.dataTile;
              ctx.fillText(
                `${k + (k ? " " : "") + dt.z} ${dt.x} ${dt.y}`,
                preparedTile.origin.x + 4,
                preparedTile.origin.y + 14 * (1 + idx)
              );
            }
            idx++;
          }
          ctx.restore();
        }
        return {
          elapsed: performance.now() - start,
          project: instancedProject(origin, displayZoom),
          unproject: instancedUnproject(origin, displayZoom)
        };
      });
    }
    drawCanvas(_0, _1, _2) {
      return __async(this, arguments, function* (canvas, latlng, displayZoom, options = {}) {
        const dpr = window.devicePixelRatio;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (!(canvas.width === width * dpr && canvas.height === height * dpr)) {
          canvas.width = width * dpr;
          canvas.height = height * dpr;
        }
        if (options.lang)
          canvas.lang = options.lang;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          console.error("Failed to initialize canvas2d context.");
          return;
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return this.drawContext(ctx, width, height, latlng, displayZoom);
      });
    }
    drawContextBounds(ctx, topLeft, bottomRight, width, height) {
      return __async(this, null, function* () {
        const deltaDegrees = bottomRight.x - topLeft.x;
        const center = new import_point_geometry7.default(
          (topLeft.x + bottomRight.x) / 2,
          (topLeft.y + bottomRight.y) / 2
        );
        return this.drawContext(
          ctx,
          width,
          height,
          center,
          getZoom(deltaDegrees, width)
        );
      });
    }
    drawCanvasBounds(_0, _1, _2, _3) {
      return __async(this, arguments, function* (canvas, topLeft, bottomRight, width, options = {}) {
        const deltaDegrees = bottomRight.x - topLeft.x;
        const center = new import_point_geometry7.default(
          (topLeft.x + bottomRight.x) / 2,
          (topLeft.y + bottomRight.y) / 2
        );
        return this.drawCanvas(
          canvas,
          center,
          getZoom(deltaDegrees, width),
          options
        );
      });
    }
  };

  // src/frontends/leaflet.ts
  var import_point_geometry8 = __toESM(require_point_geometry());
  var timer = (duration) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  };
  var reflect = (promise) => {
    return promise.then(
      (v) => {
        return { status: "fulfilled", value: v };
      },
      (error) => {
        return { status: "rejected", reason: error };
      }
    );
  };
  var leafletLayer = (options = {}) => {
    class LeafletLayer extends L.GridLayer {
      constructor(options2 = {}) {
        if (options2.noWrap && !options2.bounds)
          options2.bounds = [
            [-90, -180],
            [90, 180]
          ];
        if (options2.attribution == null)
          options2.attribution = '<a href="https://protomaps.com">Protomaps</a> \xA9 <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>';
        super(options2);
        if (options2.theme) {
          const theme = themes_default[options2.theme];
          this.paintRules = paintRules(theme);
          this.labelRules = labelRules(theme);
          this.backgroundColor = theme.background;
        } else {
          this.paintRules = options2.paintRules || [];
          this.labelRules = options2.labelRules || [];
          this.backgroundColor = options2.backgroundColor;
        }
        this.lastRequestedZ = void 0;
        this.tasks = options2.tasks || [];
        this.views = sourcesToViews(options2);
        this.debug = options2.debug;
        const scratch = document.createElement("canvas").getContext("2d");
        this.scratch = scratch;
        this.onTilesInvalidated = (tiles) => {
          for (const t of tiles) {
            this.rerenderTile(t);
          }
        };
        this.labelers = new Labelers(
          this.scratch,
          this.labelRules,
          16,
          this.onTilesInvalidated
        );
        this.tileSize = 256 * window.devicePixelRatio;
        this.tileDelay = options2.tileDelay || 3;
        this.lang = options2.lang;
      }
      renderTile(coords, element, key, done = () => {
      }) {
        return __async(this, null, function* () {
          this.lastRequestedZ = coords.z;
          const promises = [];
          for (const [k, v] of this.views) {
            const promise = v.getDisplayTile(coords);
            promises.push({ key: k, promise });
          }
          const tileResponses = yield Promise.all(
            promises.map((o) => {
              return o.promise.then(
                (v) => {
                  return { status: "fulfilled", value: v, key: o.key };
                },
                (error) => {
                  return { status: "rejected", reason: error, key: o.key };
                }
              );
            })
          );
          const preparedTilemap = /* @__PURE__ */ new Map();
          for (const tileResponse of tileResponses) {
            if (tileResponse.status === "fulfilled") {
              preparedTilemap.set(tileResponse.key, [tileResponse.value]);
            } else {
              if (tileResponse.reason.name === "AbortError") {
              } else {
                console.error(tileResponse.reason);
              }
            }
          }
          if (element.key !== key)
            return;
          if (this.lastRequestedZ !== coords.z)
            return;
          yield Promise.all(this.tasks.map(reflect));
          if (element.key !== key)
            return;
          if (this.lastRequestedZ !== coords.z)
            return;
          const layoutTime = this.labelers.add(coords.z, preparedTilemap);
          if (element.key !== key)
            return;
          if (this.lastRequestedZ !== coords.z)
            return;
          const labelData = this.labelers.getIndex(coords.z);
          if (!this._map)
            return;
          const center = this._map.getCenter().wrap();
          const pixelBounds = this._getTiledPixelBounds(center);
          const tileRange = this._pxBoundsToTileRange(pixelBounds);
          const tileCenter = tileRange.getCenter();
          const priority = coords.distanceTo(tileCenter) * this.tileDelay;
          yield timer(priority);
          if (element.key !== key)
            return;
          if (this.lastRequestedZ !== coords.z)
            return;
          const buf = 16;
          const bbox = {
            minX: 256 * coords.x - buf,
            minY: 256 * coords.y - buf,
            maxX: 256 * (coords.x + 1) + buf,
            maxY: 256 * (coords.y + 1) + buf
          };
          const origin = new import_point_geometry8.default(256 * coords.x, 256 * coords.y);
          element.width = this.tileSize;
          element.height = this.tileSize;
          const ctx = element.getContext("2d");
          if (!ctx) {
            console.error("Failed to get Canvas context");
            return;
          }
          ctx.setTransform(this.tileSize / 256, 0, 0, this.tileSize / 256, 0, 0);
          ctx.clearRect(0, 0, 256, 256);
          if (this.backgroundColor) {
            ctx.save();
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(0, 0, 256, 256);
            ctx.restore();
          }
          let paintingTime = 0;
          const paintRules2 = this.paintRules;
          paintingTime = paint(
            ctx,
            coords.z,
            preparedTilemap,
            this.xray ? null : labelData,
            paintRules2,
            bbox,
            origin,
            false,
            this.debug
          );
          if (this.debug) {
            ctx.save();
            ctx.fillStyle = this.debug;
            ctx.font = "600 12px sans-serif";
            ctx.fillText(`${coords.z} ${coords.x} ${coords.y}`, 4, 14);
            ctx.font = "12px sans-serif";
            let ypos = 28;
            for (const [k, v] of preparedTilemap) {
              const dt = v[0].dataTile;
              ctx.fillText(`${k + (k ? " " : "") + dt.z} ${dt.x} ${dt.y}`, 4, ypos);
              ypos += 14;
            }
            ctx.font = "600 10px sans-serif";
            if (paintingTime > 8) {
              ctx.fillText(`${paintingTime.toFixed()} ms paint`, 4, ypos);
              ypos += 14;
            }
            if (layoutTime > 8) {
              ctx.fillText(`${layoutTime.toFixed()} ms layout`, 4, ypos);
            }
            ctx.strokeStyle = this.debug;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, 256);
            ctx.stroke();
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(256, 0);
            ctx.stroke();
            ctx.restore();
          }
          done();
        });
      }
      rerenderTile(key) {
        for (const unwrappedK in this._tiles) {
          const wrappedCoord = this._wrapCoords(
            this._keyToTileCoords(unwrappedK)
          );
          if (key === this._tileCoordsToKey(wrappedCoord)) {
            this.renderTile(wrappedCoord, this._tiles[unwrappedK].el, key);
          }
        }
      }
      clearLayout() {
        this.labelers = new Labelers(
          this.scratch,
          this.labelRules,
          16,
          this.onTilesInvalidated
        );
      }
      rerenderTiles() {
        for (const unwrappedK in this._tiles) {
          const wrappedCoord = this._wrapCoords(
            this._keyToTileCoords(unwrappedK)
          );
          const key = this._tileCoordsToKey(wrappedCoord);
          this.renderTile(wrappedCoord, this._tiles[unwrappedK].el, key);
        }
      }
      createTile(coords, showTile) {
        const element = L.DomUtil.create("canvas", "leaflet-tile");
        element.lang = this.lang;
        const key = this._tileCoordsToKey(coords);
        element.key = key;
        this.renderTile(coords, element, key, () => {
          showTile(void 0, element);
        });
        return element;
      }
      _removeTile(key) {
        const tile = this._tiles[key];
        if (!tile) {
          return;
        }
        tile.el.removed = true;
        tile.el.key = void 0;
        L.DomUtil.removeClass(tile.el, "leaflet-tile-loaded");
        tile.el.width = tile.el.height = 0;
        L.DomUtil.remove(tile.el);
        delete this._tiles[key];
        this.fire("tileunload", {
          tile: tile.el,
          coords: this._keyToTileCoords(key)
        });
      }
    }
    return new LeafletLayer(options);
  };

  // node_modules/potpack/index.mjs
  function potpack(boxes) {
    let area = 0;
    let maxWidth = 0;
    for (const box of boxes) {
      area += box.w * box.h;
      maxWidth = Math.max(maxWidth, box.w);
    }
    boxes.sort((a, b) => b.h - a.h);
    const startWidth = Math.max(Math.ceil(Math.sqrt(area / 0.95)), maxWidth);
    const spaces = [{ x: 0, y: 0, w: startWidth, h: Infinity }];
    let width = 0;
    let height = 0;
    for (const box of boxes) {
      for (let i2 = spaces.length - 1; i2 >= 0; i2--) {
        const space = spaces[i2];
        if (box.w > space.w || box.h > space.h)
          continue;
        box.x = space.x;
        box.y = space.y;
        height = Math.max(height, box.y + box.h);
        width = Math.max(width, box.x + box.w);
        if (box.w === space.w && box.h === space.h) {
          const last = spaces.pop();
          if (i2 < spaces.length)
            spaces[i2] = last;
        } else if (box.h === space.h) {
          space.x += box.w;
          space.w -= box.w;
        } else if (box.w === space.w) {
          space.y += box.h;
          space.h -= box.h;
        } else {
          spaces.push({
            x: space.x + box.w,
            y: space.y,
            w: space.w - box.w,
            h: box.h
          });
          space.y += box.h;
          space.h -= box.h;
        }
        break;
      }
    }
    return {
      w: width,
      h: height,
      fill: area / (width * height) || 0
    };
  }

  // src/task.ts
  var Font = (name, url, weight) => {
    const ff = new FontFace(name, `url(${url})`, { weight });
    document.fonts.add(ff);
    return ff.load();
  };
  var mkimg = (src) => __async(void 0, null, function* () {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject("Invalid SVG");
      img.src = src;
    });
  });
  var MISSING = `
<svg width="20px" height="20px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <rect width="50" height="50" fill="#cccccc"/>
    <g transform="translate(5,5)">
        <path fill="none" stroke="#666666" stroke-width="7" d="m11,12a8.5,8 0 1,1 17,0q0,4-4,6t-4.5,4.5-.4,4v.2m0,3v7"/>
    </g>
</svg>
`;
  var Sheet = class {
    constructor(src) {
      this.src = src;
      this.canvas = document.createElement("canvas");
      this.mapping = /* @__PURE__ */ new Map();
      this.missingBox = { x: 0, y: 0, w: 0, h: 0 };
    }
    load() {
      return __async(this, null, function* () {
        let src = this.src;
        const scale = window.devicePixelRatio;
        if (src.endsWith(".html")) {
          const c = yield fetch(src);
          src = yield c.text();
        }
        const tree = new window.DOMParser().parseFromString(src, "text/html");
        const icons = Array.from(tree.body.children);
        const missingImg = yield mkimg(
          `data:image/svg+xml;base64,${btoa(MISSING)}`
        );
        const boxes = [
          {
            w: missingImg.width * scale,
            h: missingImg.height * scale,
            img: missingImg,
            id: ""
          }
        ];
        const serializer = new XMLSerializer();
        for (const ps of icons) {
          const svg64 = btoa(serializer.serializeToString(ps));
          const image64 = `data:image/svg+xml;base64,${svg64}`;
          const img = yield mkimg(image64);
          boxes.push({
            w: img.width * scale,
            h: img.height * scale,
            img,
            id: ps.id
          });
        }
        const packresult = potpack(boxes);
        this.canvas.width = packresult.w;
        this.canvas.height = packresult.h;
        const ctx = this.canvas.getContext("2d");
        if (ctx) {
          for (const box of boxes) {
            if (box.x !== void 0 && box.y !== void 0) {
              ctx.drawImage(box.img, box.x, box.y, box.w, box.h);
              if (box.id)
                this.mapping.set(box.id, {
                  x: box.x,
                  y: box.y,
                  w: box.w,
                  h: box.h
                });
              else
                this.missingBox = { x: box.x, y: box.y, w: box.w, h: box.h };
            }
          }
        }
        return this;
      });
    }
    get(name) {
      let result = this.mapping.get(name);
      if (!result)
        result = this.missingBox;
      return result;
    }
  };
  return __toCommonJS(src_exports);
})();
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
