/* Magic Mirror
 * Module: MMM-FuckOff
 *
 * By Mykle1
 *
 */
Module.register("MMM-FuckOff", {

    // Module config defaults.
    defaults: {
        useHeader: true,                 // False if you don't want a header      
        header: "",                      // Change in config file. useHeader must be true
        maxWidth: "300px",
        animationSpeed: 3000,            // fade speed
        initialLoadDelay: 3250,
        retryDelay: 2500,
        rotateInterval: 5 * 60 * 1000,   // 5 minutes
        updateInterval: 60 * 60 * 1000,

    },

    getStyles: function() {
        return ["MMM-FuckOff.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

        //  Set locale.
        this.url = "https://www.foaas.com/operations";
        this.FuckOff = [];
        this.activeItem = 0;
        this.rotateInterval = null;
        this.scheduleUpdate();
    },

    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = "Lost in space . . .";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "header");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }
		
		
	//	Rotating my data
		var FuckOff = this.FuckOff;
		var FuckOffKeys = Object.keys(this.FuckOff);
        if (FuckOffKeys.length > 0) {
            if (this.activeItem >= FuckOffKeys.length) {
                this.activeItem = 0;
            }
            var FuckOff = this.FuckOff[FuckOffKeys[this.activeItem]];
		
		console.log(FuckOff); // for checking

        var top = document.createElement("div");
        top.classList.add("list-row");
		
		// The date and time you were fucked (text)
        var dat = document.createElement("div");
        name.classList.add("small", "bright", "name");
        name.innerHTML = "The date and time you were fucked";
        wrapper.appendChild(name);
		
		
		// date and time (actual)
        var date = document.createElement("div");
        date.classList.add("small", "bright", "date");
		// this.sTrim(nasa.data[0].description, 187, ' ', ' ...'); AND function below.
        date.innerHTML = this.sTrim(Date(), 40, ' ', ' ');
        wrapper.appendChild(date);
		
		
        // The name of the fuck saying
        var name = document.createElement("div");
        name.classList.add("small", "bright", "name");
		
		//img.src = this.url + fuck.url;
        name.innerHTML = FuckOff.name;
        wrapper.appendChild(name);
 

        // Their spacecraft
        var craft = document.createElement("div");
        craft.classList.add("small", "bright", "craft");
		if (response = "ISS") {
			craft.innerHTML = "The International Space Station";
		} else 	
			craft.innerHTML = Jetsons.craft;
			wrapper.appendChild(craft);
						
		}
        return wrapper;
    },


    processFuckOff: function(data) {
        this.today = data.Today;
        this.FuckOff = data; // Object containing an array that contains objects
        this.loaded = true;
    },
	
	sTrim: function(str, length, delim, appendix) {
        if (str.length <= length) return str;
        var trimmedStr = str.substr(0, length + delim.length);
        var lastDelimIndex = trimmedStr.lastIndexOf(delim);
        if (lastDelimIndex >= 0) trimmedStr = trimmedStr.substr(0, lastDelimIndex);
        if (trimmedStr) trimmedStr += appendix;
        return trimmedStr;
    },

    scheduleCarousel: function() {
        console.log("Carousel of FuckOff fucktion!");
        this.rotateInterval = setInterval(() => {
            this.activeItem++;
            this.updateDom(this.config.animationSpeed);
        }, this.config.rotateInterval);
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getFuckOff();
        }, this.config.updateInterval);
        this.getFuckOff(this.config.initialLoadDelay);
    },

    getFuckOff: function() {
        this.sendSocketNotification('GET_FUCKOFF', this.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "FUCKOFF_RESULT") {
            this.processFuckOff(payload);
            if (this.rotateInterval == null) {
                this.scheduleCarousel();
            }
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});
