window.SystemID = 'EU_PRODUCTION';
			if(!window.dmAPI) {
				window.dmAPI = {
					registerExternalRuntimeComponent: function() {
					}
					,getCurrentDeviceType: function() {
						return window._currentDevice;
					}
				};
			}
			if (!window.requestIdleCallback) {
				window.requestIdleCallback = function (fn) {
					setTimeout(fn, 0);
				}
			}
			function loadCSS(link) {
				try {
					var urlParams = new URLSearchParams(window.location.search);
					var noCSS = !!urlParams.get('nocss');
					var cssTimeout = urlParams.get('cssTimeout') || 0;
					if (noCSS) {
						return;
					}
					requestIdleCallback(function () {
						window.setTimeout(function () {
							link.onload = null;
							link.rel = 'stylesheet';
							link.type = 'text/css'
						}
						, parseInt(cssTimeout, 10));
					});
				}
				 catch (e) {
					/* Never fail - this is just a tool for measurements */
				}
			}