function ActionHtmlWindow(a) {
    this.bg = document.createElement("div"), this.box = document.createElement("div"), this.closeBtn = document.createElement("div"), this.iframeContent = document.createElement("div"), this.iframe = document.createElement("iframe"), this.box.appendChild(this.iframeContent), this.box.appendChild(this.closeBtn), this.iframeContent.appendChild(this.iframe);
    var b = this,
        c = this.formatData(a),
        d = this.bg.style,
        e = this.box.style,
        f = this.closeBtn.style,
        g = this.iframeContent.style,
        h = this.iframe.style;
    this.d = c, d.position = "fixed", d.top = "0", d.right = "0", d.bottom = "0", d.left = "0", d.zIndex = "1040", d.opacity = .5, d.backgroundColor = "#000", b.setAlphaOpacity(this.bg, 50), e.position = "fixed", e.top = "0", e.right = "0", e.bottom = "0", e.left = "0", e.zIndex = "1040", e.padding = "0", e.border = "none", e.margin = "0", e.overflow = "auto", g.position = "relative", g.display = "block", g.backgroundColor = "#fff", g.lineHeight = "0px", g.margin = "0 auto", g.width = c.width + "px", g.height = c.height + "px", h.position = "relative", h.border = "none", h.margin = "0", h.padding = "0", h.left = "0px", h.top = "0px", this.iframe.width = "100%", this.iframe.height = "100%", this.iframe.src = c.src, f.position = "fixed", f.width = "60px", f.height = "60px", f.top = "0px", f.right = "0px", f.overflow = "hidden", f.cursor = "pointer", this.closeBtn.title = "Close", this.closeBtn.innerHTML = "<img src='files/extfiles/close_btn.png' style='width:100%;height:100%;'>";
    var i = new Image;
    i.onload = function() {
        b.closeBtn.innerHTML = "<img src='files/extfiles/close_btn.png' style='width:100%;height:100%;'>"
    }, i.onerror = function() {
        b.closeBtn.innerHTML = "<img src='../files/extfiles/close_btn.png' style='width:100%;height:100%;'>"
    }, i.src = "files/extfiles/close_btn.png", this.box.onclick = function() {
        b.destroy()
    }, this.iframeContent.onclick = function(a) {
        return a.preventDefault(), !1
    }, this.closeBtn.onclick = function(a) {
        return a.stopPropagation(), a.preventDefault(), b.destroy(), !1
    }, this.launch(), this.setPositon(), this.isInResize = !0
}
ActionHtmlWindow.prototype = {
    constructor: ActionHtmlWindow,
    formatData: function(a) {
        var b = a.split(";"),
        	iSrc = b[0] || "";
        return {
            src: iSrc,
            width: b[1] || 600,
            height: b[2] || 340
        }
    },
    destroy: function() {
        var a = document.getElementsByTagName("body")[0];
        a.removeChild(this.bg), a.removeChild(this.box), this.isInResize = !1
    },
    launch: function() {
        var a = document.getElementsByTagName("body")[0];
        a.appendChild(this.bg), a.appendChild(this.box)
    },
    setAlphaOpacity: function(a, b) {
        document.all ? a.style.filter = "alpha(opacity=" + b + ")" : a.style.opacity = b / 100
    },
    setPositon: function() {
        this.iframeContent.style.marginTop = Math.max(10, (this.box.clientHeight - this.d.height) / 2) + "px", this.iframeContent.style.marginBottom = Math.max(10, (this.box.clientHeight - this.d.height) / 2) + "px"
    }
};
