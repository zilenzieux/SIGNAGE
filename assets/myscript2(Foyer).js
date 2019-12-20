function foyer_get_video_id(e) {
    if ("string" != typeof e) throw new TypeError("get-video-id expects a string");
    e = e.replace("-nocookie", "");
    var t;
    return /youtube|youtu\.be/.test(e) ? t = {
        id: foyer_get_video_id_youtube(e),
        service: "youtube"
    } : /vimeo/.test(e) ? t = {
        id: foyer_get_video_id_vimeo(e),
        service: "vimeo"
    } : /vine/.test(e) ? t = {
        id: foyer_get_video_id_vine(e),
        service: "vine"
    } : /videopress/.test(e) && (t = {
        id: foyer_get_video_id_videopress(e),
        service: "videopress"
    }), t
}

function foyer_get_video_id_vimeo(e) {
    e.indexOf("#") > -1 && (e = e.split("#")[0]), e.indexOf("?") > -1 && (e = e.split("?")[0]);
    var t;
    if (/https?:\/\/vimeo\.com\/[0-9]+$|https?:\/\/player\.vimeo\.com\/video\/[0-9]+$/gim.test(e)) {
        var a = e.split("/");
        a && a.length && (t = a.pop())
    }
    return t
}

function foyer_get_video_id_vine(e) {
    var t = /https:\/\/vine\.co\/v\/([a-zA-Z0-9]*)\/?/,
        a = t.exec(e);
    return a && a[1]
}

function foyer_get_video_id_youtube(e) {
    var t = /youtube:\/\/|https?:\/\/youtu\.be\//g;
    if (t.test(e)) {
        return foyer_get_video_id_stripParameters(e.split(t)[1])
    }
    var a = /\/v\/|\/vi\//g;
    if (a.test(e)) {
        return foyer_get_video_id_stripParameters(e.split(a)[1])
    }
    var r = /v=|vi=/g;
    if (r.test(e)) {
        return e.split(r)[1].split("&")[0]
    }
    var i = /\/embed\//g;
    if (i.test(e)) {
        return foyer_get_video_id_stripParameters(e.split(i)[1])
    }
    if (/\/user\//g.test(e)) return foyer_get_video_id_stripParameters(e.split("/").pop());
    var o = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;
    if (o.test(e)) return e.match(o)[1]
}

function foyer_get_video_id_videopress(e) {
    var t;
    return e.indexOf("embed") > -1 ? (t = /embed\/(\w{8})/, e.match(t)[1]) : (t = /\/v\/(\w{8})/, e.match(t)[1])
}

function foyer_get_video_id_stripParameters(e) {
    return e.indexOf("?") > -1 ? e.split("?")[0] : e
}

function foyer_display_setup_channel_scheduler() {
    $start_datetime = jQuery("#foyer_channel_editor_scheduled_channel_start"), $end_datetime = jQuery("#foyer_channel_editor_scheduled_channel_end"), (jQuery($start_datetime).length || jQuery($end_datetime).length) && (jQuery.foyer_datetimepicker.setLocale(foyer_channel_scheduler_defaults.locale), $start_datetime.foyer_datetimepicker({
        format: foyer_channel_scheduler_defaults.datetime_format,
        dayOfWeekStart: foyer_channel_scheduler_defaults.start_of_week,
        step: 15,
        onChangeDateTime: function(e) {
            if (e && (!$end_datetime.val() || new Date($end_datetime.val()) < e)) {
                var t = new Date(e.getTime() + 1e3 * foyer_channel_scheduler_defaults.duration);
                $end_datetime.val(t.dateFormat(foyer_channel_scheduler_defaults.datetime_format))
            }
        }
    }), $end_datetime.foyer_datetimepicker({
        format: foyer_channel_scheduler_defaults.datetime_format,
        dayOfWeekStart: foyer_channel_scheduler_defaults.start_of_week,
        step: 15
    }))
}

function init_slide_background_select() {
    var e, t;
    e = jQuery("#foyer_slide_content select[name=slide_background]"), t = jQuery("#foyer_slide_content select[name=slide_background]").val(), update_slide_background_select(), e.find('option[value="' + t + '"]').attr("selected", "selected")
}

function update_slide_background_meta_boxes() {
    var e, t;
    e = jQuery(".foyer_slide_backgrounds > *"), slide_background = jQuery("#foyer_slide_content select[name=slide_background]").val(), e.hide().filter("#foyer_slide_background_" + slide_background).show()
}

function update_slide_background_select() {
    var e, t, a;
    e = jQuery("#foyer_slide_content select[name=slide_background]"), t = jQuery("#foyer_slide_content select[name=slide_format]").val(), a = foyer_slide_formats_backgrounds[t], e.empty(), a && jQuery.each(a, function(t, a) {
        e.append(jQuery("<option></option>").attr("value", t).text(a.title))
    })
}

function update_slide_format_meta_boxes() {
    var e, t;
    e = jQuery(".foyer_slide_formats > *"), t = jQuery("#foyer_slide_content select[name=slide_format]").val(), e.hide().filter("#foyer_slide_format_" + t).show()
}

function foyer_admin_load_youtube_api() {
    var e = document.createElement("script");
    e.src = "https://www.youtube.com/iframe_api";
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t)
}

function foyer_admin_slide_bg_video_prepare_player_for_playback() {
    if (window.foyer_yt_player) {
        var e = window.foyer_yt_player;
        foyer_admin_slide_bg_video_update_player_mute(), e.playVideo()
    }
}

function foyer_admin_slide_bg_video_update_player_mute() {
    if (window.foyer_yt_player) {
        var e = window.foyer_yt_player;
        jQuery("#slide_bg_video_enable_sound").prop("checked") ? e.unMute() : e.mute()
    }
}

function foyer_admin_slide_bg_video_update_youtube_video_preview() {
    if (jQuery("#slide_bg_video_video_id").val() && jQuery("#slide_bg_video_video_id").val().length)
        if (window.foyer_yt_player) {
            var e = window.foyer_yt_player,
                t = jQuery("#slide_bg_video_video_id").val(),
                a = jQuery("#slide_bg_video_video_start").val(),
                r = jQuery("#slide_bg_video_video_end").val();
            t && (foyer_admin_slide_bg_video_update_player_mute(), e.loadVideoById({
                videoId: t,
                startSeconds: a,
                endSeconds: r
            }))
        } else foyer_admin_load_youtube_api()
}

function foyer_admin_slide_bg_video_validate_youtube_video_url() {
    var e = foyer_get_video_id(jQuery("#slide_bg_video_video_url").val());
    if (e && e.id && "youtube" == e.service) jQuery("#slide_bg_video_video_url").val("https://youtu.be/" + e.id), jQuery("#slide_bg_video_video_id").val(e.id), jQuery("#slide_bg_video_video_url_notification").addClass("hidden"), foyer_admin_slide_bg_video_update_youtube_video_preview();
    else {
        if (window.foyer_yt_player) {
            window.foyer_yt_player.pauseVideo()
        }
        jQuery("#slide_bg_video_video_id").val(""), jQuery("#slide_bg_video_video_url_notification").removeClass("hidden")
    }
}

function onYouTubeIframeAPIReady() {
    var e = jQuery("#slide_bg_video_video_id").val(),
        t = jQuery("#slide_bg_video_video_start").val(),
        a = jQuery("#slide_bg_video_video_end").val();
    window.foyer_yt_player = new YT.Player("foyer-admin-video-preview", {
        width: "480",
        height: "270",
        videoId: e,
        playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            start: t,
            end: a
        },
        events: {
            onReady: foyer_admin_slide_bg_video_prepare_player_for_playback
        }
    })
}

function foyer_admin_slide_bg_html5_video_update_player_mute() {
    var e = jQuery("#slide_bg_html5_video_video_preview").get(0);
    e && (jQuery("#slide_bg_html5_video_enable_sound").prop("checked") ? e.muted = !1 : e.muted = !0)
}

function foyer_admin_slide_bg_html5_video_update_url_status() {
    jQuery("#slide_bg_html5_video_video_url").val().length ? jQuery("#slide_bg_html5_video_file_field").removeClass("empty") : jQuery("#slide_bg_html5_video_file_field").addClass("empty")
}

function foyer_admin_slide_bg_html5_video_update_youtube_video_preview() {
    if (jQuery("#slide_bg_html5_video_video_url").val() && jQuery("#slide_bg_html5_video_video_url").val().length) {
        var e = jQuery("#slide_bg_html5_video_video_preview").get(0);
        if (e) {
            var t = jQuery("#slide_bg_html5_video_video_url").val(),
                a = jQuery("#slide_bg_html5_video_video_start").val(),
                r = jQuery("#slide_bg_html5_video_video_end").val();
            foyer_admin_slide_bg_html5_video_update_player_mute(), jQuery("#slide_bg_html5_video_video_url_notification").addClass("hidden"), e.src = t, e.currentTime = a, e.addEventListener("error", function(e) {
                4 === this.error.code && jQuery("#slide_bg_html5_video_video_url_notification").removeClass("hidden")
            }, !0), e.play(), jQuery("#slide_bg_html5_video_video_url_notification").addClass("hidden"), e.ontimeupdate = function() {
                (this.duration < r || !r) && (r = this.duration), this.currentTime >= r && e.pause()
            }
        }
    }
}
var DateFormatter;
! function() {
    "use strict";
    var e, t, a, r, i, o;
    i = 864e5, o = 3600, e = function(e, t) {
        return "string" == typeof e && "string" == typeof t && e.toLowerCase() === t.toLowerCase()
    }, t = function(e, a, r) {
        var i = r || "0",
            o = e.toString();
        return o.length < a ? t(i + o, a) : o
    }, a = function(e) {
        var t, r;
        for (e = e || {}, t = 1; t < arguments.length; t++)
            if (r = arguments[t])
                for (var i in r) r.hasOwnProperty(i) && ("object" == typeof r[i] ? a(e[i], r[i]) : e[i] = r[i]);
        return e
    }, r = {
        dateSettings: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            meridiem: ["AM", "PM"],
            ordinal: function(e) {
                var t = e % 10,
                    a = {
                        1: "st",
                        2: "nd",
                        3: "rd"
                    };
                return 1 !== Math.floor(e % 100 / 10) && a[t] ? a[t] : "th"
            }
        },
        separators: /[ \-+\/\.T:@]/g,
        validParts: /[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,
        intParts: /[djwNzmnyYhHgGis]/g,
        tzParts: /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        tzClip: /[^-+\dA-Z]/g
    }, DateFormatter = function(e) {
        var t = this,
            i = a(r, e);
        t.dateSettings = i.dateSettings, t.separators = i.separators, t.validParts = i.validParts, t.intParts = i.intParts, t.tzParts = i.tzParts, t.tzClip = i.tzClip
    }, DateFormatter.prototype = {
        constructor: DateFormatter,
        parseDate: function(t, a) {
            var r = this,
                i, o, n, s = !1,
                d = !1,
                l, u, f = r.dateSettings,
                c, m, _, h, g, p = {
                    date: null,
                    year: null,
                    month: null,
                    day: null,
                    hour: 0,
                    min: 0,
                    sec: 0
                };
            if (t) {
                if (t instanceof Date) return t;
                if ("number" == typeof t) return new Date(t);
                if ("U" === a) return n = parseInt(t), n ? new Date(1e3 * n) : t;
                if ("string" != typeof t) return "";
                if (!(i = a.match(r.validParts)) || 0 === i.length) throw new Error("Invalid date format definition.");
                for (o = t.replace(r.separators, "\0").split("\0"), n = 0; n < o.length; n++) switch (l = o[n], u = parseInt(l), i[n]) {
                    case "y":
                    case "Y":
                        h = l.length, 2 === h ? p.year = parseInt((u < 70 ? "20" : "19") + l) : 4 === h && (p.year = u), s = !0;
                        break;
                    case "m":
                    case "n":
                    case "M":
                    case "F":
                        isNaN(l) ? (c = f.monthsShort.indexOf(l), c > -1 && (p.month = c + 1), (c = f.months.indexOf(l)) > -1 && (p.month = c + 1)) : u >= 1 && u <= 12 && (p.month = u), s = !0;
                        break;
                    case "d":
                    case "j":
                        u >= 1 && u <= 31 && (p.day = u), s = !0;
                        break;
                    case "g":
                    case "h":
                        m = i.indexOf("a") > -1 ? i.indexOf("a") : i.indexOf("A") > -1 ? i.indexOf("A") : -1, g = o[m], m > -1 ? (_ = e(g, f.meridiem[0]) ? 0 : e(g, f.meridiem[1]) ? 12 : -1, u >= 1 && u <= 12 && _ > -1 ? p.hour = u + _ : u >= 0 && u <= 23 && (p.hour = u)) : u >= 0 && u <= 23 && (p.hour = u), d = !0;
                        break;
                    case "G":
                    case "H":
                        u >= 0 && u <= 23 && (p.hour = u), d = !0;
                        break;
                    case "i":
                        u >= 0 && u <= 59 && (p.min = u), d = !0;
                        break;
                    case "s":
                        u >= 0 && u <= 59 && (p.sec = u), d = !0;
                        break
                }
                if (!0 === s && p.year && p.month && p.day) p.date = new Date(p.year, p.month - 1, p.day, p.hour, p.min, p.sec, 0);
                else {
                    if (!0 !== d) return !1;
                    p.date = new Date(0, 0, 0, p.hour, p.min, p.sec, 0)
                }
                return p.date
            }
        },
        guessDate: function(e, t) {
            if ("string" != typeof e) return e;
            var a = this,
                r = e.replace(a.separators, "\0").split("\0"),
                i = /^[djmn]/g,
                o = t.match(a.validParts),
                n = new Date,
                s = 0,
                d, l, u, f;
            if (!i.test(o[0])) return e;
            for (l = 0; l < r.length; l++) {
                switch (s = 2, u = r[l], f = parseInt(u.substr(0, 2)), l) {
                    case 0:
                        "m" === o[0] || "n" === o[0] ? n.setMonth(f - 1) : n.setDate(f);
                        break;
                    case 1:
                        "m" === o[0] || "n" === o[0] ? n.setDate(f) : n.setMonth(f - 1);
                        break;
                    case 2:
                        d = n.getFullYear(), u.length < 4 ? (n.setFullYear(parseInt(d.toString().substr(0, 4 - u.length) + u)), s = u.length) : (n.setFullYear = parseInt(u.substr(0, 4)), s = 4);
                        break;
                    case 3:
                        n.setHours(f);
                        break;
                    case 4:
                        n.setMinutes(f);
                        break;
                    case 5:
                        n.setSeconds(f);
                        break
                }
                u.substr(s).length > 0 && r.splice(l + 1, 0, u.substr(s))
            }
            return n
        },
        parseFormat: function(e, a) {
            var r = this,
                n = r.dateSettings,
                s, d = /\\?(.?)/gi,
                l = function(e, t) {
                    return s[e] ? s[e]() : t
                };
            return s = {
                d: function() {
                    return t(s.j(), 2)
                },
                D: function() {
                    return n.daysShort[s.w()]
                },
                j: function() {
                    return a.getDate()
                },
                l: function() {
                    return n.days[s.w()]
                },
                N: function() {
                    return s.w() || 7
                },
                w: function() {
                    return a.getDay()
                },
                z: function() {
                    var e = new Date(s.Y(), s.n() - 1, s.j()),
                        t = new Date(s.Y(), 0, 1);
                    return Math.round((e - t) / i)
                },
                W: function() {
                    var e = new Date(s.Y(), s.n() - 1, s.j() - s.N() + 3),
                        a = new Date(e.getFullYear(), 0, 4);
                    return t(1 + Math.round((e - a) / i / 7), 2)
                },
                F: function() {
                    return n.months[a.getMonth()]
                },
                m: function() {
                    return t(s.n(), 2)
                },
                M: function() {
                    return n.monthsShort[a.getMonth()]
                },
                n: function() {
                    return a.getMonth() + 1
                },
                t: function() {
                    return new Date(s.Y(), s.n(), 0).getDate()
                },
                L: function() {
                    var e = s.Y();
                    return e % 4 == 0 && e % 100 != 0 || e % 400 == 0 ? 1 : 0
                },
                o: function() {
                    var e = s.n(),
                        t = s.W();
                    return s.Y() + (12 === e && t < 9 ? 1 : 1 === e && t > 9 ? -1 : 0)
                },
                Y: function() {
                    return a.getFullYear()
                },
                y: function() {
                    return s.Y().toString().slice(-2)
                },
                a: function() {
                    return s.A().toLowerCase()
                },
                A: function() {
                    var e = s.G() < 12 ? 0 : 1;
                    return n.meridiem[e]
                },
                B: function() {
                    var e = a.getUTCHours() * o,
                        r = 60 * a.getUTCMinutes(),
                        i = a.getUTCSeconds();
                    return t(Math.floor((e + r + i + o) / 86.4) % 1e3, 3)
                },
                g: function() {
                    return s.G() % 12 || 12
                },
                G: function() {
                    return a.getHours()
                },
                h: function() {
                    return t(s.g(), 2)
                },
                H: function() {
                    return t(s.G(), 2)
                },
                i: function() {
                    return t(a.getMinutes(), 2)
                },
                s: function() {
                    return t(a.getSeconds(), 2)
                },
                u: function() {
                    return t(1e3 * a.getMilliseconds(), 6)
                },
                e: function() {
                    return /\((.*)\)/.exec(String(a))[1] || "Coordinated Universal Time"
                },
                T: function() {
                    return (String(a).match(r.tzParts) || [""]).pop().replace(r.tzClip, "") || "UTC"
                },
                I: function() {
                    return new Date(s.Y(), 0) - Date.UTC(s.Y(), 0) != new Date(s.Y(), 6) - Date.UTC(s.Y(), 6) ? 1 : 0
                },
                O: function() {
                    var e = a.getTimezoneOffset(),
                        r = Math.abs(e);
                    return (e > 0 ? "-" : "+") + t(100 * Math.floor(r / 60) + r % 60, 4)
                },
                P: function() {
                    var e = s.O();
                    return e.substr(0, 3) + ":" + e.substr(3, 2)
                },
                Z: function() {
                    return 60 * -a.getTimezoneOffset()
                },
                c: function() {
                    return "Y-m-d\\TH:i:sP".replace(d, l)
                },
                r: function() {
                    return "D, d M Y H:i:s O".replace(d, l)
                },
                U: function() {
                    return a.getTime() / 1e3 || 0
                }
            }, l(e, e)
        },
        formatDate: function(e, t) {
            var a = this,
                r, i, o, n, s, d = "";
            if ("string" == typeof e && !1 === (e = a.parseDate(e, t))) return !1;
            if (e instanceof Date) {
                for (o = t.length, r = 0; r < o; r++) "S" !== (s = t.charAt(r)) && (n = a.parseFormat(s, e), r !== o - 1 && a.intParts.test(s) && "S" === t.charAt(r + 1) && (i = parseInt(n), n += a.dateSettings.ordinal(i)), d += n);
                return d
            }
            return ""
        }
    }
}(),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "jquery-mousewheel"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
}(function($) {
    "use strict";

    function e(e, t, a) {
        this.date = e, this.desc = t, this.style = a
    }
    var t = !1,
        a = {
            i18n: {
                ar: {
                    months: ["كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"],
                    dayOfWeekShort: ["ن", "ث", "ع", "خ", "ج", "س", "ح"],
                    dayOfWeek: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"]
                },
                ro: {
                    months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
                    dayOfWeekShort: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
                    dayOfWeek: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă"]
                },
                id: {
                    months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
                    dayOfWeekShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
                    dayOfWeek: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
                },
                is: {
                    months: ["Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"],
                    dayOfWeekShort: ["Sun", "Mán", "Þrið", "Mið", "Fim", "Fös", "Lau"],
                    dayOfWeek: ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur"]
                },
                bg: {
                    months: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
                    dayOfWeekShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                    dayOfWeek: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"]
                },
                fa: {
                    months: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
                    dayOfWeekShort: ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"],
                    dayOfWeek: ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه", "یک‌شنبه"]
                },
                ru: {
                    months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                    dayOfWeekShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                    dayOfWeek: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
                },
                uk: {
                    months: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
                    dayOfWeekShort: ["Ндл", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"],
                    dayOfWeek: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
                },
                en: {
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    dayOfWeekShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                },
                el: {
                    months: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
                    dayOfWeekShort: ["Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"],
                    dayOfWeek: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"]
                },
                de: {
                    months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                    dayOfWeekShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                    dayOfWeek: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
                },
                nl: {
                    months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
                    dayOfWeekShort: ["zo", "ma", "di", "wo", "do", "vr", "za"],
                    dayOfWeek: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
                },
                tr: {
                    months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
                    dayOfWeekShort: ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"],
                    dayOfWeek: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
                },
                fr: {
                    months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                    dayOfWeekShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                    dayOfWeek: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
                },
                es: {
                    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    dayOfWeekShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
                    dayOfWeek: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
                },
                th: {
                    months: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
                    dayOfWeekShort: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
                    dayOfWeek: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"]
                },
                pl: {
                    months: ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"],
                    dayOfWeekShort: ["nd", "pn", "wt", "śr", "cz", "pt", "sb"],
                    dayOfWeek: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]
                },
                pt: {
                    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    dayOfWeekShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                    dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
                },
                ch: {
                    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"]
                },
                se: {
                    months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
                    dayOfWeekShort: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"]
                },
                kr: {
                    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                    dayOfWeekShort: ["일", "월", "화", "수", "목", "금", "토"],
                    dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
                },
                it: {
                    months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
                    dayOfWeekShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
                    dayOfWeek: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]
                },
                da: {
                    months: ["January", "Februar", "Marts", "April", "Maj", "Juni", "July", "August", "September", "Oktober", "November", "December"],
                    dayOfWeekShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
                    dayOfWeek: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]
                },
                no: {
                    months: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
                    dayOfWeekShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
                    dayOfWeek: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"]
                },
                ja: {
                    months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                    dayOfWeekShort: ["日", "月", "火", "水", "木", "金", "土"],
                    dayOfWeek: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"]
                },
                vi: {
                    months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
                    dayOfWeekShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
                    dayOfWeek: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
                },
                sl: {
                    months: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
                    dayOfWeekShort: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"],
                    dayOfWeek: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"]
                },
                cs: {
                    months: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
                    dayOfWeekShort: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"]
                },
                hu: {
                    months: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
                    dayOfWeekShort: ["Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"],
                    dayOfWeek: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"]
                },
                az: {
                    months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"],
                    dayOfWeekShort: ["B", "Be", "Ça", "Ç", "Ca", "C", "Ş"],
                    dayOfWeek: ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"]
                },
                bs: {
                    months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
                    dayOfWeekShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
                    dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
                },
                ca: {
                    months: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
                    dayOfWeekShort: ["Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"],
                    dayOfWeek: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"]
                },
                "en-GB": {
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    dayOfWeekShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                },
                et: {
                    months: ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"],
                    dayOfWeekShort: ["P", "E", "T", "K", "N", "R", "L"],
                    dayOfWeek: ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"]
                },
                eu: {
                    months: ["Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"],
                    dayOfWeekShort: ["Ig.", "Al.", "Ar.", "Az.", "Og.", "Or.", "La."],
                    dayOfWeek: ["Igandea", "Astelehena", "Asteartea", "Asteazkena", "Osteguna", "Ostirala", "Larunbata"]
                },
                fi: {
                    months: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
                    dayOfWeekShort: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
                    dayOfWeek: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"]
                },
                gl: {
                    months: ["Xan", "Feb", "Maz", "Abr", "Mai", "Xun", "Xul", "Ago", "Set", "Out", "Nov", "Dec"],
                    dayOfWeekShort: ["Dom", "Lun", "Mar", "Mer", "Xov", "Ven", "Sab"],
                    dayOfWeek: ["Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado"]
                },
                hr: {
                    months: ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"],
                    dayOfWeekShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
                    dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
                },
                ko: {
                    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                    dayOfWeekShort: ["일", "월", "화", "수", "목", "금", "토"],
                    dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
                },
                lt: {
                    months: ["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"],
                    dayOfWeekShort: ["Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Šeš"],
                    dayOfWeek: ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"]
                },
                lv: {
                    months: ["Janvāris", "Februāris", "Marts", "Aprīlis ", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"],
                    dayOfWeekShort: ["Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"],
                    dayOfWeek: ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"]
                },
                mk: {
                    months: ["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"],
                    dayOfWeekShort: ["нед", "пон", "вто", "сре", "чет", "пет", "саб"],
                    dayOfWeek: ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"]
                },
                mn: {
                    months: ["1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"],
                    dayOfWeekShort: ["Дав", "Мяг", "Лха", "Пүр", "Бсн", "Бям", "Ням"],
                    dayOfWeek: ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба", "Ням"]
                },
                "pt-BR": {
                    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    dayOfWeekShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                    dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
                },
                sk: {
                    months: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
                    dayOfWeekShort: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"],
                    dayOfWeek: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"]
                },
                sq: {
                    months: ["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"],
                    dayOfWeekShort: ["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Shtu"],
                    dayOfWeek: ["E Diel", "E Hënë", "E Martē", "E Mërkurë", "E Enjte", "E Premte", "E Shtunë"]
                },
                "sr-YU": {
                    months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
                    dayOfWeekShort: ["Ned", "Pon", "Uto", "Sre", "čet", "Pet", "Sub"],
                    dayOfWeek: ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"]
                },
                sr: {
                    months: ["јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"],
                    dayOfWeekShort: ["нед", "пон", "уто", "сре", "чет", "пет", "суб"],
                    dayOfWeek: ["Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"]
                },
                sv: {
                    months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
                    dayOfWeekShort: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
                    dayOfWeek: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
                },
                "zh-TW": {
                    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
                    dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
                },
                zh: {
                    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
                    dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
                },
                he: {
                    months: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
                    dayOfWeekShort: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"],
                    dayOfWeek: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", "ראשון"]
                },
                hy: {
                    months: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"],
                    dayOfWeekShort: ["Կի", "Երկ", "Երք", "Չոր", "Հնգ", "Ուրբ", "Շբթ"],
                    dayOfWeek: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"]
                },
                kg: {
                    months: ["Үчтүн айы", "Бирдин айы", "Жалган Куран", "Чын Куран", "Бугу", "Кулжа", "Теке", "Баш Оона", "Аяк Оона", "Тогуздун айы", "Жетинин айы", "Бештин айы"],
                    dayOfWeekShort: ["Жек", "Дүй", "Шей", "Шар", "Бей", "Жум", "Ише"],
                    dayOfWeek: ["Жекшемб", "Дүйшөмб", "Шейшемб", "Шаршемб", "Бейшемби", "Жума", "Ишенб"]
                },
                rm: {
                    months: ["Schaner", "Favrer", "Mars", "Avrigl", "Matg", "Zercladur", "Fanadur", "Avust", "Settember", "October", "November", "December"],
                    dayOfWeekShort: ["Du", "Gli", "Ma", "Me", "Gie", "Ve", "So"],
                    dayOfWeek: ["Dumengia", "Glindesdi", "Mardi", "Mesemna", "Gievgia", "Venderdi", "Sonda"]
                },
                ka: {
                    months: ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"],
                    dayOfWeekShort: ["კვ", "ორშ", "სამშ", "ოთხ", "ხუთ", "პარ", "შაბ"],
                    dayOfWeek: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"]
                }
            },
            value: "",
            rtl: !1,
            format: "Y/m/d H:i",
            formatTime: "H:i",
            formatDate: "Y/m/d",
            startDate: !1,
            step: 60,
            monthChangeSpinner: !0,
            closeOnDateSelect: !1,
            closeOnTimeSelect: !0,
            closeOnWithoutClick: !0,
            closeOnInputClick: !0,
            timepicker: !0,
            datepicker: !0,
            weeks: !1,
            defaultTime: !1,
            defaultDate: !1,
            minDate: !1,
            maxDate: !1,
            minTime: !1,
            maxTime: !1,
            disabledMinTime: !1,
            disabledMaxTime: !1,
            allowTimes: [],
            opened: !1,
            initTime: !0,
            inline: !1,
            theme: "",
            onSelectDate: function() {},
            onSelectTime: function() {},
            onChangeMonth: function() {},
            onGetWeekOfYear: function() {},
            onChangeYear: function() {},
            onChangeDateTime: function() {},
            onShow: function() {},
            onClose: function() {},
            onGenerate: function() {},
            withoutCopyright: !0,
            inverseButton: !1,
            hours12: !1,
            next: "xdsoft_next",
            prev: "xdsoft_prev",
            dayOfWeekStart: 0,
            parentID: "body",
            timeHeightInTimePicker: 25,
            timepickerScrollbar: !0,
            todayButton: !0,
            prevButton: !0,
            nextButton: !0,
            defaultSelect: !0,
            scrollMonth: !0,
            scrollTime: !0,
            scrollInput: !0,
            lazyInit: !1,
            mask: !1,
            validateOnBlur: !0,
            allowBlank: !0,
            yearStart: 1950,
            yearEnd: 2050,
            monthStart: 0,
            monthEnd: 11,
            style: "",
            id: "",
            fixed: !1,
            roundTime: "round",
            className: "",
            weekends: [],
            highlightedDates: [],
            highlightedPeriods: [],
            allowDates: [],
            allowDateRe: null,
            disabledDates: [],
            disabledWeekDays: [],
            yearOffset: 0,
            beforeShowDay: null,
            enterLikeTab: !0,
            showApplyButton: !1
        },
        r = null,
        i = "en",
        o = "en",
        n = {
            meridiem: ["AM", "PM"]
        },
        s = function() {
            var e = a.i18n[o],
                t = {
                    days: e.dayOfWeek,
                    daysShort: e.dayOfWeekShort,
                    months: e.months,
                    monthsShort: $.map(e.months, function(e) {
                        return e.substring(0, 3)
                    })
                };
            r = new DateFormatter({
                dateSettings: $.extend({}, n, t)
            })
        };
    $.foyer_datetimepicker = {
        setLocale: function(e) {
            var t = a.i18n[e] ? e : "en";
            o != t && (o = t, s())
        },
        setDateFormatter: function(e) {
            r = e
        },
        RFC_2822: "D, d M Y H:i:s O",
        ATOM: "Y-m-dTH:i:sP",
        ISO_8601: "Y-m-dTH:i:sO",
        RFC_822: "D, d M y H:i:s O",
        RFC_850: "l, d-M-y H:i:s T",
        RFC_1036: "D, d M y H:i:s O",
        RFC_1123: "D, d M Y H:i:s O",
        RSS: "D, d M Y H:i:s O",
        W3C: "Y-m-dTH:i:sP"
    }, s(), window.getComputedStyle || (window.getComputedStyle = function(e, t) {
        return this.el = e, this.getPropertyValue = function(t) {
            var a = /(\-([a-z]){1})/g;
            return "float" === t && (t = "styleFloat"), a.test(t) && (t = t.replace(a, function(e, t, a) {
                return a.toUpperCase()
            })), e.currentStyle[t] || null
        }, this
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
        var a, r;
        for (a = t || 0, r = this.length; a < r; a += 1)
            if (this[a] === e) return a;
        return -1
    }), Date.prototype.countDaysInMonth = function() {
        return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate()
    }, $.fn.xdsoftScroller = function(e) {
        return this.each(function() {
            var t = $(this),
                a = function(e) {
                    var t = {
                            x: 0,
                            y: 0
                        },
                        a;
                    return "touchstart" === e.type || "touchmove" === e.type || "touchend" === e.type || "touchcancel" === e.type ? (a = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0], t.x = a.clientX, t.y = a.clientY) : "mousedown" !== e.type && "mouseup" !== e.type && "mousemove" !== e.type && "mouseover" !== e.type && "mouseout" !== e.type && "mouseenter" !== e.type && "mouseleave" !== e.type || (t.x = e.clientX, t.y = e.clientY), t
                },
                r, i, o, n, s, d = 100,
                l = !1,
                u = 0,
                f = 0,
                c = 0,
                m = !1,
                _ = 0,
                h = function() {};
            if ("hide" === e) return void t.find(".xdsoft_scrollbar").hide();
            $(this).hasClass("xdsoft_scroller_box") || (r = t.children().eq(0), i = t[0].clientHeight, o = r[0].offsetHeight, n = $('<div class="xdsoft_scrollbar"></div>'), s = $('<div class="xdsoft_scroller"></div>'), n.append(s), t.addClass("xdsoft_scroller_box").append(n), h = function e(r) {
                var i = a(r).y - u + _;
                i < 0 && (i = 0), i + s[0].offsetHeight > c && (i = c - s[0].offsetHeight), t.trigger("scroll_element.xdsoft_scroller", [d ? i / d : 0])
            }, s.on("touchstart.xdsoft_scroller mousedown.xdsoft_scroller", function(r) {
                i || t.trigger("resize_scroll.xdsoft_scroller", [e]), u = a(r).y, _ = parseInt(s.css("margin-top"), 10), c = n[0].offsetHeight, "mousedown" === r.type || "touchstart" === r.type ? (document && $(document.body).addClass("xdsoft_noselect"), $([document.body, window]).on("touchend mouseup.xdsoft_scroller", function e() {
                    $([document.body, window]).off("touchend mouseup.xdsoft_scroller", e).off("mousemove.xdsoft_scroller", h).removeClass("xdsoft_noselect")
                }), $(document.body).on("mousemove.xdsoft_scroller", h)) : (m = !0, r.stopPropagation(), r.preventDefault())
            }).on("touchmove", function(e) {
                m && (e.preventDefault(), h(e))
            }).on("touchend touchcancel", function() {
                m = !1, _ = 0
            }), t.on("scroll_element.xdsoft_scroller", function(e, a) {
                i || t.trigger("resize_scroll.xdsoft_scroller", [a, !0]), a = a > 1 ? 1 : a < 0 || isNaN(a) ? 0 : a, s.css("margin-top", d * a), setTimeout(function() {
                    r.css("marginTop", -parseInt((r[0].offsetHeight - i) * a, 10))
                }, 10)
            }).on("resize_scroll.xdsoft_scroller", function(e, a, l) {
                var u, f;
                i = t[0].clientHeight, o = r[0].offsetHeight, u = i / o, f = u * n[0].offsetHeight, u > 1 ? s.hide() : (s.show(), s.css("height", parseInt(f > 10 ? f : 10, 10)), d = n[0].offsetHeight - s[0].offsetHeight, !0 !== l && t.trigger("scroll_element.xdsoft_scroller", [a || Math.abs(parseInt(r.css("marginTop"), 10)) / (o - i)]))
            }), t.on("mousewheel", function(e) {
                var a = Math.abs(parseInt(r.css("marginTop"), 10));
                return a -= 20 * e.deltaY, a < 0 && (a = 0), t.trigger("scroll_element.xdsoft_scroller", [a / (o - i)]), e.stopPropagation(), !1
            }), t.on("touchstart", function(e) {
                l = a(e), f = Math.abs(parseInt(r.css("marginTop"), 10))
            }), t.on("touchmove", function(e) {
                if (l) {
                    e.preventDefault();
                    var r = a(e);
                    t.trigger("scroll_element.xdsoft_scroller", [(f - (r.y - l.y)) / (o - i)])
                }
            }), t.on("touchend touchcancel", function() {
                l = !1, f = 0
            })), t.trigger("resize_scroll.xdsoft_scroller", [e])
        })
    }, $.fn.foyer_datetimepicker = function(i, n) {
        var s = this,
            d = 48,
            l = 57,
            u = 96,
            f = 105,
            c = 17,
            m = 46,
            _ = 13,
            h = 27,
            g = 8,
            p = 37,
            y = 38,
            v = 39,
            b = 40,
            k = 9,
            x = 116,
            D = 65,
            T = 67,
            w = 86,
            S = 90,
            O = 89,
            M = !1,
            j = $.isPlainObject(i) || !i ? $.extend(!0, {}, a, i) : $.extend(!0, {}, a),
            W = 0,
            C, F, P = function(e) {
                e.on("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart", function t() {
                    e.is(":disabled") || e.data("xdsoft_datetimepicker") || (clearTimeout(W), W = setTimeout(function() {
                        e.data("xdsoft_datetimepicker") || C(e), e.off("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart", t).trigger("open.xdsoft")
                    }, 100))
                })
            };
        return C = function(a) {
            function n() {
                var e = !1,
                    t;
                return j.startDate ? e = U.strToDate(j.startDate) : (e = j.value || (a && a.val && a.val() ? a.val() : ""), e ? e = U.strToDateTime(e) : j.defaultDate && (e = U.strToDateTime(j.defaultDate), j.defaultTime && (t = U.strtotime(j.defaultTime), e.setHours(t.getHours()), e.setMinutes(t.getMinutes())))), e && U.isValidDate(e) ? W.data("changed", !0) : e = "", e || 0
            }

            function s(e) {
                var t = function(e, t) {
                        var a = e.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, "\\$1").replace(/_/g, "{digit+}").replace(/([0-9]{1})/g, "{digit$1}").replace(/\{digit([0-9]{1})\}/g, "[0-$1_]{1}").replace(/\{digit[\+]\}/g, "[0-9_]{1}");
                        return new RegExp(a).test(t)
                    },
                    r = function(e) {
                        try {
                            if (document.selection && document.selection.createRange) {
                                return document.selection.createRange().getBookmark().charCodeAt(2) - 2
                            }
                            if (e.setSelectionRange) return e.selectionStart
                        } catch (e) {
                            return 0
                        }
                    },
                    i = function(e, t) {
                        if (!(e = "string" == typeof e || e instanceof String ? document.getElementById(e) : e)) return !1;
                        if (e.createTextRange) {
                            var a = e.createTextRange();
                            return a.collapse(!0), a.moveEnd("character", t), a.moveStart("character", t), a.select(), !0
                        }
                        return !!e.setSelectionRange && (e.setSelectionRange(t, t), !0)
                    };
                e.mask && a.off("keydown.xdsoft"), !0 === e.mask && ("undefined" != typeof moment ? e.mask = e.format.replace(/Y{4}/g, "9999").replace(/Y{2}/g, "99").replace(/M{2}/g, "19").replace(/D{2}/g, "39").replace(/H{2}/g, "29").replace(/m{2}/g, "59").replace(/s{2}/g, "59") : e.mask = e.format.replace(/Y/g, "9999").replace(/F/g, "9999").replace(/m/g, "19").replace(/d/g, "39").replace(/H/g, "29").replace(/i/g, "59").replace(/s/g, "59")), "string" === $.type(e.mask) && (t(e.mask, a.val()) || (a.val(e.mask.replace(/[0-9]/g, "_")), i(a[0], 0)), a.on("keydown.xdsoft", function(o) {
                    var n = this.value,
                        s = o.which,
                        j, W;
                    if (s >= d && s <= l || s >= u && s <= f || s === g || s === m) {
                        for (j = r(this), W = s !== g && s !== m ? String.fromCharCode(u <= s && s <= f ? s - d : s) : "_", s !== g && s !== m || !j || (j -= 1, W = "_");
                            /[^0-9_]/.test(e.mask.substr(j, 1)) && j < e.mask.length && j > 0;) j += s === g || s === m ? -1 : 1;
                        if (n = n.substr(0, j) + W + n.substr(j + 1), "" === $.trim(n)) n = e.mask.replace(/[0-9]/g, "_");
                        else if (j === e.mask.length) return o.preventDefault(), !1;
                        for (j += s === g || s === m ? 0 : 1;
                            /[^0-9_]/.test(e.mask.substr(j, 1)) && j < e.mask.length && j > 0;) j += s === g || s === m ? -1 : 1;
                        t(e.mask, n) ? (this.value = n, i(this, j)) : "" === $.trim(n) ? this.value = e.mask.replace(/[0-9]/g, "_") : a.trigger("error_input.xdsoft")
                    } else if (-1 !== [D, T, w, S, O].indexOf(s) && M || -1 !== [h, y, b, p, v, x, c, k, _].indexOf(s)) return !0;
                    return o.preventDefault(), !1
                }))
            }
            var W = $('<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'),
                C = $('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
                F = $('<div class="xdsoft_datepicker active"></div>'),
                P = $('<div class="xdsoft_monthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button><div class="xdsoft_label xdsoft_month"><span></span><i></i></div><div class="xdsoft_label xdsoft_year"><span></span><i></i></div><button type="button" class="xdsoft_next"></button></div>'),
                A = $('<div class="xdsoft_calendar"></div>'),
                Y = $('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
                Q = Y.find(".xdsoft_time_box").eq(0),
                z = $('<div class="xdsoft_time_variant"></div>'),
                H = $('<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'),
                J = $('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),
                I = $('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),
                N = !1,
                L, E, R, B, V, G = 0,
                U, q, X;
            j.id && W.attr("id", j.id), j.style && W.attr("style", j.style), j.weeks && W.addClass("xdsoft_showweeks"), j.rtl && W.addClass("xdsoft_rtl"), W.addClass("xdsoft_" + j.theme), W.addClass(j.className), P.find(".xdsoft_month span").after(J), P.find(".xdsoft_year span").after(I), P.find(".xdsoft_month,.xdsoft_year").on("touchstart mousedown.xdsoft", function(e) {
                var t = $(this).find(".xdsoft_select").eq(0),
                    a = 0,
                    r = 0,
                    i = t.is(":visible"),
                    o, n;
                for (P.find(".xdsoft_select").hide(), U.currentTime && (a = U.currentTime[$(this).hasClass("xdsoft_month") ? "getMonth" : "getFullYear"]()), t[i ? "hide" : "show"](), o = t.find("div.xdsoft_option"), n = 0; n < o.length && o.eq(n).data("value") !== a; n += 1) r += o[0].offsetHeight;
                return t.xdsoftScroller(r / (t.children()[0].offsetHeight - t[0].clientHeight)), e.stopPropagation(), !1
            }), P.find(".xdsoft_select").xdsoftScroller().on("touchstart mousedown.xdsoft", function(e) {
                e.stopPropagation(), e.preventDefault()
            }).on("touchstart mousedown.xdsoft", ".xdsoft_option", function() {
                void 0 !== U.currentTime && null !== U.currentTime || (U.currentTime = U.now());
                var e = U.currentTime.getFullYear();
                U && U.currentTime && U.currentTime[$(this).parent().parent().hasClass("xdsoft_monthselect") ? "setMonth" : "setFullYear"]($(this).data("value")), $(this).parent().parent().hide(), W.trigger("xchange.xdsoft"), j.onChangeMonth && $.isFunction(j.onChangeMonth) && j.onChangeMonth.call(W, U.currentTime, W.data("input")), e !== U.currentTime.getFullYear() && $.isFunction(j.onChangeYear) && j.onChangeYear.call(W, U.currentTime, W.data("input"))
            }), W.getValue = function() {
                return U.getCurrentTime()
            }, W.setOptions = function(t) {
                var i = {};
                j = $.extend(!0, {}, j, t), t.allowTimes && $.isArray(t.allowTimes) && t.allowTimes.length && (j.allowTimes = $.extend(!0, [], t.allowTimes)), t.weekends && $.isArray(t.weekends) && t.weekends.length && (j.weekends = $.extend(!0, [], t.weekends)), t.allowDates && $.isArray(t.allowDates) && t.allowDates.length && (j.allowDates = $.extend(!0, [], t.allowDates)), t.allowDateRe && "[object String]" === Object.prototype.toString.call(t.allowDateRe) && (j.allowDateRe = new RegExp(t.allowDateRe)), t.highlightedDates && $.isArray(t.highlightedDates) && t.highlightedDates.length && ($.each(t.highlightedDates, function(t, a) {
                    var o = $.map(a.split(","), $.trim),
                        n, s = new e(r.parseDate(o[0], j.formatDate), o[1], o[2]),
                        d = r.formatDate(s.date, j.formatDate);
                    void 0 !== i[d] ? (n = i[d].desc) && n.length && s.desc && s.desc.length && (i[d].desc = n + "\n" + s.desc) : i[d] = s
                }), j.highlightedDates = $.extend(!0, [], i)), t.highlightedPeriods && $.isArray(t.highlightedPeriods) && t.highlightedPeriods.length && (i = $.extend(!0, [], j.highlightedDates), $.each(t.highlightedPeriods, function(t, a) {
                    var o, n, s, d, l, u, f;
                    if ($.isArray(a)) o = a[0], n = a[1], s = a[2], f = a[3];
                    else {
                        var c = $.map(a.split(","), $.trim);
                        o = r.parseDate(c[0], j.formatDate), n = r.parseDate(c[1], j.formatDate), s = c[2], f = c[3]
                    }
                    for (; o <= n;) d = new e(o, s, f), l = r.formatDate(o, j.formatDate), o.setDate(o.getDate() + 1), void 0 !== i[l] ? (u = i[l].desc) && u.length && d.desc && d.desc.length && (i[l].desc = u + "\n" + d.desc) : i[l] = d
                }), j.highlightedDates = $.extend(!0, [], i)), t.disabledDates && $.isArray(t.disabledDates) && t.disabledDates.length && (j.disabledDates = $.extend(!0, [], t.disabledDates)), t.disabledWeekDays && $.isArray(t.disabledWeekDays) && t.disabledWeekDays.length && (j.disabledWeekDays = $.extend(!0, [], t.disabledWeekDays)), !j.open && !j.opened || j.inline || a.trigger("open.xdsoft"), j.inline && (N = !0, W.addClass("xdsoft_inline"), a.after(W).hide()), j.inverseButton && (j.next = "xdsoft_prev", j.prev = "xdsoft_next"), j.datepicker ? F.addClass("active") : F.removeClass("active"), j.timepicker ? Y.addClass("active") : Y.removeClass("active"), j.value && (U.setCurrentTime(j.value), a && a.val && a.val(U.str)), isNaN(j.dayOfWeekStart) ? j.dayOfWeekStart = 0 : j.dayOfWeekStart = parseInt(j.dayOfWeekStart, 10) % 7, j.timepickerScrollbar || Q.xdsoftScroller("hide"), j.minDate && /^[\+\-](.*)$/.test(j.minDate) && (j.minDate = r.formatDate(U.strToDateTime(j.minDate), j.formatDate)), j.maxDate && /^[\+\-](.*)$/.test(j.maxDate) && (j.maxDate = r.formatDate(U.strToDateTime(j.maxDate), j.formatDate)), H.toggle(j.showApplyButton), P.find(".xdsoft_today_button").css("visibility", j.todayButton ? "visible" : "hidden"), P.find("." + j.prev).css("visibility", j.prevButton ? "visible" : "hidden"), P.find("." + j.next).css("visibility", j.nextButton ? "visible" : "hidden"), s(j), j.validateOnBlur && a.off("blur.xdsoft").on("blur.xdsoft", function() {
                    if (j.allowBlank && (!$.trim($(this).val()).length || "string" == typeof j.mask && $.trim($(this).val()) === j.mask.replace(/[0-9]/g, "_"))) $(this).val(null), W.data("xdsoft_datetime").empty();
                    else {
                        var e = r.parseDate($(this).val(), j.format);
                        if (e) $(this).val(r.formatDate(e, j.format));
                        else {
                            var t = +[$(this).val()[0], $(this).val()[1]].join(""),
                                a = +[$(this).val()[2], $(this).val()[3]].join("");
                            !j.datepicker && j.timepicker && t >= 0 && t < 24 && a >= 0 && a < 60 ? $(this).val([t, a].map(function(e) {
                                return e > 9 ? e : "0" + e
                            }).join(":")) : $(this).val(r.formatDate(U.now(), j.format))
                        }
                        W.data("xdsoft_datetime").setCurrentTime($(this).val())
                    }
                    W.trigger("changedatetime.xdsoft"), W.trigger("close.xdsoft")
                }), j.dayOfWeekStartPrev = 0 === j.dayOfWeekStart ? 6 : j.dayOfWeekStart - 1, W.trigger("xchange.xdsoft").trigger("afterOpen.xdsoft")
            }, W.data("options", j).on("touchstart mousedown.xdsoft", function(e) {
                return e.stopPropagation(), e.preventDefault(), I.hide(), J.hide(), !1
            }), Q.append(z), Q.xdsoftScroller(), W.on("afterOpen.xdsoft", function() {
                Q.xdsoftScroller()
            }), W.append(F).append(Y), !0 !== j.withoutCopyright && W.append(C), F.append(P).append(A).append(H), $(j.parentID).append(W), L = function() {
                var e = this;
                e.now = function(t) {
                    var a = new Date,
                        r, i;
                    return !t && j.defaultDate && (r = e.strToDateTime(j.defaultDate), a.setFullYear(r.getFullYear()), a.setMonth(r.getMonth()), a.setDate(r.getDate())), j.yearOffset && a.setFullYear(a.getFullYear() + j.yearOffset), !t && j.defaultTime && (i = e.strtotime(j.defaultTime), a.setHours(i.getHours()), a.setMinutes(i.getMinutes())), a
                }, e.isValidDate = function(e) {
                    return "[object Date]" === Object.prototype.toString.call(e) && !isNaN(e.getTime())
                }, e.setCurrentTime = function(t, a) {
                    "string" == typeof t ? e.currentTime = e.strToDateTime(t) : e.isValidDate(t) ? e.currentTime = t : t || a || !j.allowBlank ? e.currentTime = e.now() : e.currentTime = null, W.trigger("xchange.xdsoft")
                }, e.empty = function() {
                    e.currentTime = null
                }, e.getCurrentTime = function(t) {
                    return e.currentTime
                }, e.nextMonth = function() {
                    void 0 !== e.currentTime && null !== e.currentTime || (e.currentTime = e.now());
                    var t = e.currentTime.getMonth() + 1,
                        a;
                    return 12 === t && (e.currentTime.setFullYear(e.currentTime.getFullYear() + 1), t = 0), a = e.currentTime.getFullYear(), e.currentTime.setDate(Math.min(new Date(e.currentTime.getFullYear(), t + 1, 0).getDate(), e.currentTime.getDate())), e.currentTime.setMonth(t), j.onChangeMonth && $.isFunction(j.onChangeMonth) && j.onChangeMonth.call(W, U.currentTime, W.data("input")), a !== e.currentTime.getFullYear() && $.isFunction(j.onChangeYear) && j.onChangeYear.call(W, U.currentTime, W.data("input")), W.trigger("xchange.xdsoft"), t
                }, e.prevMonth = function() {
                    void 0 !== e.currentTime && null !== e.currentTime || (e.currentTime = e.now());
                    var t = e.currentTime.getMonth() - 1;
                    return -1 === t && (e.currentTime.setFullYear(e.currentTime.getFullYear() - 1), t = 11), e.currentTime.setDate(Math.min(new Date(e.currentTime.getFullYear(), t + 1, 0).getDate(), e.currentTime.getDate())), e.currentTime.setMonth(t), j.onChangeMonth && $.isFunction(j.onChangeMonth) && j.onChangeMonth.call(W, U.currentTime, W.data("input")), W.trigger("xchange.xdsoft"), t
                }, e.getWeekOfYear = function(e) {
                    if (j.onGetWeekOfYear && $.isFunction(j.onGetWeekOfYear)) {
                        var t = j.onGetWeekOfYear.call(W, e);
                        if (void 0 !== t) return t
                    }
                    var a = new Date(e.getFullYear(), 0, 1);
                    return 4 != a.getDay() && a.setMonth(0, 1 + (4 - a.getDay() + 7) % 7), Math.ceil(((e - a) / 864e5 + a.getDay() + 1) / 7)
                }, e.strToDateTime = function(t) {
                    var a = [],
                        i, o;
                    return t && t instanceof Date && e.isValidDate(t) ? t : (a = /^(\+|\-)(.*)$/.exec(t), a && (a[2] = r.parseDate(a[2], j.formatDate)), a && a[2] ? (i = a[2].getTime() - 6e4 * a[2].getTimezoneOffset(), o = new Date(e.now(!0).getTime() + parseInt(a[1] + "1", 10) * i)) : o = t ? r.parseDate(t, j.format) : e.now(), e.isValidDate(o) || (o = e.now()), o)
                }, e.strToDate = function(t) {
                    if (t && t instanceof Date && e.isValidDate(t)) return t;
                    var a = t ? r.parseDate(t, j.formatDate) : e.now(!0);
                    return e.isValidDate(a) || (a = e.now(!0)), a
                }, e.strtotime = function(t) {
                    if (t && t instanceof Date && e.isValidDate(t)) return t;
                    var a = t ? r.parseDate(t, j.formatTime) : e.now(!0);
                    return e.isValidDate(a) || (a = e.now(!0)), a
                }, e.str = function() {
                    return r.formatDate(e.currentTime, j.format)
                }, e.currentTime = this.now()
            }, U = new L, H.on("touchend click", function(e) {
                e.preventDefault(), W.data("changed", !0), U.setCurrentTime(n()), a.val(U.str()), W.trigger("close.xdsoft")
            }), P.find(".xdsoft_today_button").on("touchend mousedown.xdsoft", function() {
                W.data("changed", !0), U.setCurrentTime(0, !0), W.trigger("afterOpen.xdsoft")
            }).on("dblclick.xdsoft", function() {
                var e = U.getCurrentTime(),
                    t, r;
                e = new Date(e.getFullYear(), e.getMonth(), e.getDate()), t = U.strToDate(j.minDate), t = new Date(t.getFullYear(), t.getMonth(), t.getDate()), e < t || (r = U.strToDate(j.maxDate), r = new Date(r.getFullYear(), r.getMonth(), r.getDate()), e > r || (a.val(U.str()), a.trigger("change"), W.trigger("close.xdsoft")))
            }), P.find(".xdsoft_prev,.xdsoft_next").on("touchend mousedown.xdsoft", function() {
                var e = $(this),
                    t = 0,
                    a = !1;
                ! function r(i) {
                    e.hasClass(j.next) ? U.nextMonth() : e.hasClass(j.prev) && U.prevMonth(), j.monthChangeSpinner && (a || (t = setTimeout(r, i || 100)))
                }(500), $([document.body, window]).on("touchend mouseup.xdsoft", function e() {
                    clearTimeout(t), a = !0, $([document.body, window]).off("touchend mouseup.xdsoft", e)
                })
            }), Y.find(".xdsoft_prev,.xdsoft_next").on("touchend mousedown.xdsoft", function() {
                var e = $(this),
                    t = 0,
                    a = !1,
                    r = 110;
                ! function i(o) {
                    var n = Q[0].clientHeight,
                        s = z[0].offsetHeight,
                        d = Math.abs(parseInt(z.css("marginTop"), 10));
                    e.hasClass(j.next) && s - n - j.timeHeightInTimePicker >= d ? z.css("marginTop", "-" + (d + j.timeHeightInTimePicker) + "px") : e.hasClass(j.prev) && d - j.timeHeightInTimePicker >= 0 && z.css("marginTop", "-" + (d - j.timeHeightInTimePicker) + "px"), Q.trigger("scroll_element.xdsoft_scroller", [Math.abs(parseInt(z[0].style.marginTop, 10) / (s - n))]), r = r > 10 ? 10 : r - 10, a || (t = setTimeout(i, o || r))
                }(500), $([document.body, window]).on("touchend mouseup.xdsoft", function e() {
                    clearTimeout(t), a = !0, $([document.body, window]).off("touchend mouseup.xdsoft", e)
                })
            }), E = 0, W.on("xchange.xdsoft", function(e) {
                clearTimeout(E), E = setTimeout(function() {
                    if (void 0 === U.currentTime || null === U.currentTime) {
                        if (j.allowBlank) return;
                        U.currentTime = U.now()
                    }
                    for (var e = "", t = new Date(U.currentTime.getFullYear(), U.currentTime.getMonth(), 1, 12, 0, 0), n = 0, s, d = U.now(), l = !1, u = !1, f, c, m, _, h, g, p = [], y, v = !0, b = "", k = "", x, D; t.getDay() !== j.dayOfWeekStart;) t.setDate(t.getDate() - 1);
                    for (e += "<table><thead><tr>", j.weeks && (e += "<th></th>"), s = 0; s < 7; s += 1) e += "<th>" + j.i18n[o].dayOfWeekShort[(s + j.dayOfWeekStart) % 7] + "</th>";
                    for (e += "</tr></thead>", e += "<tbody>", !1 !== j.maxDate && (l = U.strToDate(j.maxDate), l = new Date(l.getFullYear(), l.getMonth(), l.getDate(), 23, 59, 59, 999)), !1 !== j.minDate && (u = U.strToDate(j.minDate), u = new Date(u.getFullYear(), u.getMonth(), u.getDate())); n < U.currentTime.countDaysInMonth() || t.getDay() !== j.dayOfWeekStart || U.currentTime.getMonth() === t.getMonth();) p = [], n += 1, c = t.getDay(), m = t.getDate(), _ = t.getFullYear(), h = t.getMonth(), g = U.getWeekOfYear(t), D = "", p.push("xdsoft_date"), y = j.beforeShowDay && $.isFunction(j.beforeShowDay.call) ? j.beforeShowDay.call(W, t) : null, j.allowDateRe && "[object RegExp]" === Object.prototype.toString.call(j.allowDateRe) ? j.allowDateRe.test(r.formatDate(t, j.formatDate)) || p.push("xdsoft_disabled") : j.allowDates && j.allowDates.length > 0 ? -1 === j.allowDates.indexOf(r.formatDate(t, j.formatDate)) && p.push("xdsoft_disabled") : !1 !== l && t > l || !1 !== u && t < u || y && !1 === y[0] ? p.push("xdsoft_disabled") : -1 !== j.disabledDates.indexOf(r.formatDate(t, j.formatDate)) ? p.push("xdsoft_disabled") : -1 !== j.disabledWeekDays.indexOf(c) ? p.push("xdsoft_disabled") : a.is("[readonly]") && p.push("xdsoft_disabled"), y && "" !== y[1] && p.push(y[1]), U.currentTime.getMonth() !== h && p.push("xdsoft_other_month"), (j.defaultSelect || W.data("changed")) && r.formatDate(U.currentTime, j.formatDate) === r.formatDate(t, j.formatDate) && p.push("xdsoft_current"), r.formatDate(d, j.formatDate) === r.formatDate(t, j.formatDate) && p.push("xdsoft_today"), 0 !== t.getDay() && 6 !== t.getDay() && -1 === j.weekends.indexOf(r.formatDate(t, j.formatDate)) || p.push("xdsoft_weekend"), void 0 !== j.highlightedDates[r.formatDate(t, j.formatDate)] && (f = j.highlightedDates[r.formatDate(t, j.formatDate)], p.push(void 0 === f.style ? "xdsoft_highlighted_default" : f.style), D = void 0 === f.desc ? "" : f.desc), j.beforeShowDay && $.isFunction(j.beforeShowDay) && p.push(j.beforeShowDay(t)), v && (e += "<tr>", v = !1, j.weeks && (e += "<th>" + g + "</th>")), e += '<td data-date="' + m + '" data-month="' + h + '" data-year="' + _ + '" class="xdsoft_date xdsoft_day_of_week' + t.getDay() + " " + p.join(" ") + '" title="' + D + '"><div>' + m + "</div></td>", t.getDay() === j.dayOfWeekStartPrev && (e += "</tr>", v = !0), t.setDate(m + 1);
                    if (e += "</tbody></table>", A.html(e), P.find(".xdsoft_label span").eq(0).text(j.i18n[o].months[U.currentTime.getMonth()]), P.find(".xdsoft_label span").eq(1).text(U.currentTime.getFullYear()), b = "", k = "", h = "", x = function e(t, i) {
                            var o = U.now(),
                                n, s, l = j.allowTimes && $.isArray(j.allowTimes) && j.allowTimes.length;
                            o.setHours(t), t = parseInt(o.getHours(), 10), o.setMinutes(i), i = parseInt(o.getMinutes(), 10), n = new Date(U.currentTime), n.setHours(t), n.setMinutes(i), p = [], !1 !== j.minDateTime && j.minDateTime > n || !1 !== j.maxTime && U.strtotime(j.maxTime).getTime() < o.getTime() || !1 !== j.minTime && U.strtotime(j.minTime).getTime() > o.getTime() ? p.push("xdsoft_disabled") : !1 !== j.minDateTime && j.minDateTime > n || !1 !== j.disabledMinTime && o.getTime() > U.strtotime(j.disabledMinTime).getTime() && !1 !== j.disabledMaxTime && o.getTime() < U.strtotime(j.disabledMaxTime).getTime() ? p.push("xdsoft_disabled") : a.is("[readonly]") && p.push("xdsoft_disabled"), s = new Date(U.currentTime), s.setHours(parseInt(U.currentTime.getHours(), 10)), l || s.setMinutes(Math[j.roundTime](U.currentTime.getMinutes() / j.step) * j.step), (j.initTime || j.defaultSelect || W.data("changed")) && s.getHours() === parseInt(t, 10) && (!l && j.step > 59 || s.getMinutes() === parseInt(i, 10)) && (j.defaultSelect || W.data("changed") ? p.push("xdsoft_current") : j.initTime && p.push("xdsoft_init_time")), parseInt(d.getHours(), 10) === parseInt(t, 10) && parseInt(d.getMinutes(), 10) === parseInt(i, 10) && p.push("xdsoft_today"), b += '<div class="xdsoft_time ' + p.join(" ") + '" data-hour="' + t + '" data-minute="' + i + '">' + r.formatDate(o, j.formatTime) + "</div>"
                        }, j.allowTimes && $.isArray(j.allowTimes) && j.allowTimes.length)
                        for (n = 0; n < j.allowTimes.length; n += 1) k = U.strtotime(j.allowTimes[n]).getHours(), h = U.strtotime(j.allowTimes[n]).getMinutes(), x(k, h);
                    else
                        for (n = 0, s = 0; n < (j.hours12 ? 12 : 24); n += 1)
                            for (s = 0; s < 60; s += j.step) k = (n < 10 ? "0" : "") + n, h = (s < 10 ? "0" : "") + s, x(k, h);
                    for (z.html(b), i = "", n = 0, n = parseInt(j.yearStart, 10) + j.yearOffset; n <= parseInt(j.yearEnd, 10) + j.yearOffset; n += 1) i += '<div class="xdsoft_option ' + (U.currentTime.getFullYear() === n ? "xdsoft_current" : "") + '" data-value="' + n + '">' + n + "</div>";
                    for (I.children().eq(0).html(i), n = parseInt(j.monthStart, 10), i = ""; n <= parseInt(j.monthEnd, 10); n += 1) i += '<div class="xdsoft_option ' + (U.currentTime.getMonth() === n ? "xdsoft_current" : "") + '" data-value="' + n + '">' + j.i18n[o].months[n] + "</div>";
                    J.children().eq(0).html(i), $(W).trigger("generate.xdsoft")
                }, 10), e.stopPropagation()
            }).on("afterOpen.xdsoft", function() {
                if (j.timepicker) {
                    var e, t, a, r;
                    z.find(".xdsoft_current").length ? e = ".xdsoft_current" : z.find(".xdsoft_init_time").length && (e = ".xdsoft_init_time"), e ? (t = Q[0].clientHeight, a = z[0].offsetHeight, r = z.find(e).index() * j.timeHeightInTimePicker + 1, a - t < r && (r = a - t), Q.trigger("scroll_element.xdsoft_scroller", [parseInt(r, 10) / (a - t)])) : Q.trigger("scroll_element.xdsoft_scroller", [0])
                }
            }), R = 0, A.on("touchend click.xdsoft", "td", function(e) {
                e.stopPropagation(), R += 1;
                var t = $(this),
                    r = U.currentTime;
                if (void 0 !== r && null !== r || (U.currentTime = U.now(), r = U.currentTime), t.hasClass("xdsoft_disabled")) return !1;
                r.setDate(1), r.setFullYear(t.data("year")), r.setMonth(t.data("month")), r.setDate(t.data("date")), W.trigger("select.xdsoft", [r]), a.val(U.str()), j.onSelectDate && $.isFunction(j.onSelectDate) && j.onSelectDate.call(W, U.currentTime, W.data("input"), e), W.data("changed", !0), W.trigger("xchange.xdsoft"), W.trigger("changedatetime.xdsoft"), (R > 1 || !0 === j.closeOnDateSelect || !1 === j.closeOnDateSelect && !j.timepicker) && !j.inline && W.trigger("close.xdsoft"), setTimeout(function() {
                    R = 0
                }, 200)
            }), z.on("touchmove", "div", function() {
                t = !0
            }).on("touchend click.xdsoft", "div", function(e) {
                if (e.stopPropagation(), t) return void(t = !1);
                var a = $(this),
                    r = U.currentTime;
                if (void 0 !== r && null !== r || (U.currentTime = U.now(), r = U.currentTime), a.hasClass("xdsoft_disabled")) return !1;
                r.setHours(a.data("hour")), r.setMinutes(a.data("minute")), W.trigger("select.xdsoft", [r]), W.data("input").val(U.str()), j.onSelectTime && $.isFunction(j.onSelectTime) && j.onSelectTime.call(W, U.currentTime, W.data("input"), e), W.data("changed", !0), W.trigger("xchange.xdsoft"), W.trigger("changedatetime.xdsoft"), !0 !== j.inline && !0 === j.closeOnTimeSelect && W.trigger("close.xdsoft")
            }), F.on("mousewheel.xdsoft", function(e) {
                return !j.scrollMonth || (e.deltaY < 0 ? U.nextMonth() : U.prevMonth(), !1)
            }), a.on("mousewheel.xdsoft", function(e) {
                return !j.scrollInput || (!j.datepicker && j.timepicker ? (B = z.find(".xdsoft_current").length ? z.find(".xdsoft_current").eq(0).index() : 0, B + e.deltaY >= 0 && B + e.deltaY < z.children().length && (B += e.deltaY), z.children().eq(B).length && z.children().eq(B).trigger("mousedown"), !1) : j.datepicker && !j.timepicker ? (F.trigger(e, [e.deltaY, e.deltaX, e.deltaY]), a.val && a.val(U.str()), W.trigger("changedatetime.xdsoft"), !1) : void 0)
            }), W.on("changedatetime.xdsoft", function(e) {
                if (j.onChangeDateTime && $.isFunction(j.onChangeDateTime)) {
                    var t = W.data("input");
                    j.onChangeDateTime.call(W, U.currentTime, t, e), delete j.value, t.trigger("change")
                }
            }).on("generate.xdsoft", function() {
                j.onGenerate && $.isFunction(j.onGenerate) && j.onGenerate.call(W, U.currentTime, W.data("input")), N && (W.trigger("afterOpen.xdsoft"), N = !1)
            }).on("click.xdsoft", function(e) {
                e.stopPropagation()
            }), B = 0, q = function(e, t) {
                do {
                    if (e = e.parentNode, !1 === t(e)) break
                } while ("HTML" !== e.nodeName)
            }, V = function() {
                var e, t, a, r, i, o, n, s, d, l, u, f, c;
                if (s = W.data("input"), e = s.offset(), t = s[0], l = "top", a = e.top + t.offsetHeight - 1, r = e.left, i = "absolute", d = $(window).width(), f = $(window).height(), c = $(window).scrollTop(), document.documentElement.clientWidth - e.left < F.parent().outerWidth(!0)) {
                    var m = F.parent().outerWidth(!0) - t.offsetWidth;
                    r -= m
                }
                "rtl" === s.parent().css("direction") && (r -= W.outerWidth() - s.outerWidth()), j.fixed ? (a -= c, r -= $(window).scrollLeft(), i = "fixed") : (n = !1, q(t, function(e) {
                    if ("fixed" === window.getComputedStyle(e).getPropertyValue("position")) return n = !0, !1
                }), n ? (i = "fixed", a + W.outerHeight() > f + c ? (l = "bottom", a = f + c - e.top) : a -= c) : a + t.offsetHeight > f + c && (a = e.top - t.offsetHeight + 1), a < 0 && (a = 0), r + t.offsetWidth > d && (r = d - t.offsetWidth)), o = W[0], q(o, function(e) {
                    var t;
                    if ("relative" === (t = window.getComputedStyle(e).getPropertyValue("position")) && d >= e.offsetWidth) return r -= (d - e.offsetWidth) / 2, !1
                }), u = {
                    position: i,
                    left: r,
                    top: "",
                    bottom: ""
                }, u[l] = a, W.css(u)
            }, W.on("open.xdsoft", function(e) {
                var t = !0;
                j.onShow && $.isFunction(j.onShow) && (t = j.onShow.call(W, U.currentTime, W.data("input"), e)), !1 !== t && (W.show(), V(), $(window).off("resize.xdsoft", V).on("resize.xdsoft", V), j.closeOnWithoutClick && $([document.body, window]).on("touchstart mousedown.xdsoft", function e() {
                    W.trigger("close.xdsoft"), $([document.body, window]).off("touchstart mousedown.xdsoft", e)
                }))
            }).on("close.xdsoft", function(e) {
                var t = !0;
                P.find(".xdsoft_month,.xdsoft_year").find(".xdsoft_select").hide(), j.onClose && $.isFunction(j.onClose) && (t = j.onClose.call(W, U.currentTime, W.data("input"), e)), !1 === t || j.opened || j.inline || W.hide(), e.stopPropagation()
            }).on("toggle.xdsoft", function() {
                W.is(":visible") ? W.trigger("close.xdsoft") : W.trigger("open.xdsoft")
            }).data("input", a), G = 0, W.data("xdsoft_datetime", U), W.setOptions(j), U.setCurrentTime(n()), a.data("xdsoft_datetimepicker", W).on("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart", function() {
                a.is(":disabled") || a.data("xdsoft_datetimepicker").is(":visible") && j.closeOnInputClick || (clearTimeout(G), G = setTimeout(function() {
                    a.is(":disabled") || (N = !0, U.setCurrentTime(n(), !0), j.mask && s(j), W.trigger("open.xdsoft"))
                }, 100))
            }).on("keydown.xdsoft", function(e) {
                var t, a = e.which;
                return -1 !== [_].indexOf(a) && j.enterLikeTab ? (t = $("input:visible,textarea:visible,button:visible,a:visible"), W.trigger("close.xdsoft"), t.eq(t.index(this) + 1).focus(), !1) : -1 !== [k].indexOf(a) ? (W.trigger("close.xdsoft"), !0) : void 0
            }).on("blur.xdsoft", function() {
                W.trigger("close.xdsoft")
            })
        }, F = function(e) {
            var t = e.data("xdsoft_datetimepicker");
            t && (t.data("xdsoft_datetime", null), t.remove(), e.data("xdsoft_datetimepicker", null).off(".xdsoft"), $(window).off("resize.xdsoft"), $([window, document.body]).off("mousedown.xdsoft touchstart"), e.unmousewheel && e.unmousewheel())
        }, $(document).off("keydown.xdsoftctrl keyup.xdsoftctrl").on("keydown.xdsoftctrl", function(e) {
            e.keyCode === c && (M = !0)
        }).on("keyup.xdsoftctrl", function(e) {
            e.keyCode === c && (M = !1)
        }), this.each(function() {
            var e = $(this).data("xdsoft_datetimepicker"),
                t;
            if (e) {
                if ("string" === $.type(i)) switch (i) {
                    case "show":
                        $(this).select().focus(), e.trigger("open.xdsoft");
                        break;
                    case "hide":
                        e.trigger("close.xdsoft");
                        break;
                    case "toggle":
                        e.trigger("toggle.xdsoft");
                        break;
                    case "destroy":
                        F($(this));
                        break;
                    case "reset":
                        this.value = this.defaultValue, this.value && e.data("xdsoft_datetime").isValidDate(r.parseDate(this.value, j.format)) || e.data("changed", !1), e.data("xdsoft_datetime").setCurrentTime(this.value);
                        break;
                    case "validate":
                        t = e.data("input"), t.trigger("blur.xdsoft");
                        break;
                    default:
                        e[i] && $.isFunction(e[i]) && (s = e[i](n))
                } else e.setOptions(i);
                return 0
            }
            "string" !== $.type(i) && (!j.lazyInit || j.open || j.inline ? C($(this)) : P($(this)))
        }), s
    }, $.fn.foyer_datetimepicker.defaults = a
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
}(function($) {
    function e(e) {
        var r = e || window.event,
            i = o.call(arguments, 1),
            d = 0,
            u = 0,
            f = 0,
            c = 0,
            m = 0,
            _ = 0;
        if (e = $.event.fix(r), e.type = "mousewheel", "detail" in r && (f = -1 * r.detail), "wheelDelta" in r && (f = r.wheelDelta), "wheelDeltaY" in r && (f = r.wheelDeltaY), "wheelDeltaX" in r && (u = -1 * r.wheelDeltaX), "axis" in r && r.axis === r.HORIZONTAL_AXIS && (u = -1 * f, f = 0), d = 0 === f ? u : f, "deltaY" in r && (f = -1 * r.deltaY, d = f), "deltaX" in r && (u = r.deltaX, 0 === f && (d = -1 * u)), 0 !== f || 0 !== u) {
            if (1 === r.deltaMode) {
                var h = $.data(this, "mousewheel-line-height");
                d *= h, f *= h, u *= h
            } else if (2 === r.deltaMode) {
                var g = $.data(this, "mousewheel-page-height");
                d *= g, f *= g, u *= g
            }
            if (c = Math.max(Math.abs(f), Math.abs(u)), (!s || c < s) && (s = c, a(r, c) && (s /= 40)), a(r, c) && (d /= 40, u /= 40, f /= 40), d = Math[d >= 1 ? "floor" : "ceil"](d / s), u = Math[u >= 1 ? "floor" : "ceil"](u / s), f = Math[f >= 1 ? "floor" : "ceil"](f / s), l.settings.normalizeOffset && this.getBoundingClientRect) {
                var p = this.getBoundingClientRect();
                m = e.clientX - p.left, _ = e.clientY - p.top
            }
            return e.deltaX = u, e.deltaY = f, e.deltaFactor = s, e.offsetX = m, e.offsetY = _, e.deltaMode = 0, i.unshift(e, d, u, f), n && clearTimeout(n), n = setTimeout(t, 200), ($.event.dispatch || $.event.handle).apply(this, i)
        }
    }

    function t() {
        s = null
    }

    function a(e, t) {
        return l.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
    }
    var r = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        i = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        o = Array.prototype.slice,
        n, s;
    if ($.event.fixHooks)
        for (var d = r.length; d;) $.event.fixHooks[r[--d]] = $.event.mouseHooks;
    var l = $.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var t = i.length; t;) this.addEventListener(i[--t], e, !1);
            else this.onmousewheel = e;
            $.data(this, "mousewheel-line-height", l.getLineHeight(this)), $.data(this, "mousewheel-page-height", l.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var t = i.length; t;) this.removeEventListener(i[--t], e, !1);
            else this.onmousewheel = null;
            $.removeData(this, "mousewheel-line-height"), $.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(e) {
            var t = $(e),
                a = t["offsetParent" in $.fn ? "offsetParent" : "parent"]();
            return a.length || (a = $("body")), parseInt(a.css("fontSize"), 10) || parseInt(t.css("fontSize"), 10) || 16
        },
        getPageHeight: function(e) {
            return $(e).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    $.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
}), jQuery(document).ready(function() {
        foyer_display_setup_channel_scheduler()
    }),
    function($) {
        "use strict";

        function e() {
            var t = $(".foyer_slides_editor"),
                a = $(".foyer_slides_editor_slides");
            $(".foyer_slides_editor_add_select").unbind("change").change(function(r) {
                var i = $(r.currentTarget).val();
                if (i > 0) {
                    var o = {
                        action: "foyer_slides_editor_add_slide",
                        channel_id: t.data("channel-id"),
                        slide_id: i,
                        nonce: foyer_slides_editor_security.nonce
                    };
                    $.post(ajaxurl, o, function(t) {
                        "" != t && (a.replaceWith(t), $(".foyer_slides_editor_add_select").val(""), e())
                    })
                }
                return !1
            }), $(".foyer_slides_editor_slides_slide_remove").unbind("click").click(function(r) {
                if (confirm(foyer_slides_editor_defaults.confirm_remove_message)) {
                    var i = {
                        action: "foyer_slides_editor_remove_slide",
                        channel_id: t.data("channel-id"),
                        slide_key: $(r.currentTarget).parents(".foyer_slides_editor_slides_slide").data("slide-key"),
                        nonce: foyer_slides_editor_security.nonce
                    };
                    $.post(ajaxurl, i, function(t) {
                        "" != t && (a.replaceWith(t), e())
                    })
                }
                return !1
            }), a.sortable({
                revert: 100,
                update: function(r, i) {
                    var o = [];
                    $(this).children().each(function() {
                        o[o.length] = $(this).data("slide-id")
                    });
                    var n = {
                        action: "foyer_slides_editor_reorder_slides",
                        channel_id: t.data("channel-id"),
                        slide_ids: o,
                        nonce: foyer_slides_editor_security.nonce
                    };
                    $.post(ajaxurl, n, function(t) {
                        "" != t && (a.replaceWith(t), e())
                    })
                }
            }), a.disableSelection()
        }
        $(function() {
            e()
        })
    }(jQuery), jQuery(function() {
        jQuery("#foyer_slide_content select[name=slide_format], #foyer_slide_content select[name=slide_background]").length && (init_slide_background_select(), update_slide_format_meta_boxes(), update_slide_background_meta_boxes()), jQuery("#foyer_slide_content select[name=slide_format]").on("change", function() {
            update_slide_background_select(), update_slide_format_meta_boxes(), update_slide_background_meta_boxes()
        }), jQuery("#foyer_slide_content select[name=slide_background]").on("change", function() {
            update_slide_background_meta_boxes()
        })
    }), jQuery(function() {
        var e;
        wp.media && (e = wp.media.model.settings.post.id, jQuery(".slide_file_upload_button").on("click", function(t) {
            var a, r, i = "image";
            if (jQuery(this).parent(".slide_file_field").hasClass("file_type_video") && (i = "video"), jQuery(this).parent(".slide_file_field").hasClass("file_type_pdf") && (i = "application/pdf"), t.preventDefault(), a = jQuery(this).parent(), r) return void r.open();
            r = wp.media.frames.file_frame = wp.media({
                title: foyer_slide_file_defaults[i].text_select,
                button: {
                    text: foyer_slide_file_defaults[i].text_use
                },
                library: {
                    type: i
                },
                multiple: !1
            }), r.on("select", function() {
                var t;
                t = r.state().get("selection").first().toJSON();
                var i;
                i = void 0 !== t.sizes && void 0 !== t.sizes.full.url ? t.sizes.full.url : t.url, a.find(".slide_file_preview").attr("src", i), a.find(".slide_file_value_url").val(t.url), a.find(".slide_file_value_url").trigger("change"), a.find(".slide_file_value").val(t.id), a.find(".slide_file_value").trigger("change"), wp.media.model.settings.post.id = e, a.removeClass("empty")
            }), r.open()
        }), jQuery(".slide_file_delete_button").on("click", function(e) {
            var t, a;
            e.preventDefault(), t = jQuery(this).parent(), t.find(".slide_file_preview").attr("src", ""), t.find(".slide_file_value_url").val(""), t.find(".slide_file_value_url").trigger("change"), t.find(".slide_file_value").val(""), t.find(".slide_file_value").trigger("change"), t.addClass("empty")
        }), jQuery("a.add_media").on("click", function() {
            wp.media.model.settings.post.id = e
        }))
    });
var foyer_yt_player;
jQuery(function() {
        jQuery("#slide_bg_video_video_url").val() && jQuery("#slide_bg_video_video_url").val().length && foyer_admin_slide_bg_video_validate_youtube_video_url(), jQuery("#slide_bg_video_video_url").on("change", function() {
            foyer_admin_slide_bg_video_validate_youtube_video_url()
        }), jQuery("#slide_bg_video_video_start").on("change", function() {
            foyer_admin_slide_bg_video_update_youtube_video_preview()
        }), jQuery("#slide_bg_video_video_end").on("change", function() {
            foyer_admin_slide_bg_video_update_youtube_video_preview()
        }), jQuery("#slide_bg_video_enable_sound").on("change", function() {
            foyer_admin_slide_bg_video_update_player_mute()
        })
    }), jQuery(function() {
        jQuery("#slide_bg_html5_video_video_url").val() && jQuery("#slide_bg_html5_video_video_url").val().length && (foyer_admin_slide_bg_html5_video_update_url_status(), foyer_admin_slide_bg_html5_video_update_youtube_video_preview()), jQuery("#slide_bg_html5_video_video_url").on("change", function() {
            foyer_admin_slide_bg_html5_video_update_url_status(), foyer_admin_slide_bg_html5_video_update_youtube_video_preview()
        }), jQuery("#slide_bg_html5_video_video_start").on("change", function() {
            foyer_admin_slide_bg_html5_video_update_youtube_video_preview()
        }), jQuery("#slide_bg_html5_video_video_end").on("change", function() {
            foyer_admin_slide_bg_html5_video_update_youtube_video_preview()
        }), jQuery("#slide_bg_html5_video_enable_sound").on("change", function() {
            foyer_admin_slide_bg_html5_video_update_player_mute()
        })
    }),
    function($) {
        "use strict";

        function e() {
            var e = $(".foyer-preview-actions .foyer-orientation-button"),
                a = $(".foyer-preview");
            e.on("click", function() {
                var r = jQuery(this).attr("data-orientation");
                e.removeClass("active");
                for (var i in foyer_preview.orientations) a.removeClass("foyer-preview-" + i);
                a.addClass("foyer-preview-" + r), jQuery(this).addClass("active"), t(r)
            })
        }

        function t(e) {
            var t = {
                action: "foyer_preview_save_orientation_choice",
                orientation: e,
                object_id: foyer_preview.object_id
            };
            jQuery.post(foyer_preview.ajax_url, t)
        }
        $(function() {
            e()
        })
    }(jQuery);