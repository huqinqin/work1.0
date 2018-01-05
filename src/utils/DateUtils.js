export default {
    getDateStr : function(date){
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        if(m<10){
            m = '0'+m;
        }
        let d = date.getDate();
        return y +'-' + m + '-' + d;
    },
    getUnixTime: function (dateStr){
        dateStr = dateStr.replace(/-/, '/');
        dateStr = dateStr.replace(/-/, '/');
        return dateStr ? new Date(dateStr) - 0 : new Date() - 0;
    },
    tiemStamp : function(unixdate){
        let date = new Date();
        date.setTime(unixdate);
        let stampTime = date.toLocaleDateString();// year month day
        //toLocaleTimeString() 时 分 秒
        return stampTime.substring(5,11);
    },

    /**
     *  对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * 例子：
     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
     */
    format : function (date, fmt) {
        if (fmt == null || fmt === undefined || fmt.length === 0) {
            fmt = "yyyy-MM-dd hh:mm:ss";
        }
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    timeToStr : function (timestamp) {
        return this.format(new Date(timestamp), "yyyy-MM-dd hh:mm:ss");
    },
    addYear : function (date){
        let d2=new Date(date);
        d2.setFullYear(d2.getFullYear()+1);
        //d2.setDate(d2.getDate()-1);
        return d2;
    },
    reduceYear : function (date){
        let d2=new Date(date);
        let latestYear = d2.getFullYear()-1;
        d2.setFullYear(latestYear);
        return d2;
    },

    datePickerOptionsShortcuts: [
        {
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近半年',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一年',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                picker.$emit('pick', [start, end]);
            }
        }]
};

