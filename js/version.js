var version = "6.3.3";
			var build = "2020-12-28T07_50_06";
			function buildEditorParent() {
				window.isMultiScreen = true;
				window.editorParent = {
				};
				window.previewParent = {
				};
				window.assetsCacheQueryParam = "?version=2020-12-28T07_50_06";
				try {
					var _p = window.parent;
					if (_p && _p.document && _p.$ && _p.$.dmfw) {
						window.editorParent = _p;
					}
					else if (_p.isSitePreview) {
						window.previewParent = _p;
					}
				}
				 catch (e) {
				}
			}
			buildEditorParent();