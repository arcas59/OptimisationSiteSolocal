_dm_gaq.siteAlias = 'e17455a31e5a4221992ed7cebb415a28';
			  _dm_gaq.systemAggregatedGaqID = 'UA-7265702-9';
			  _dm_gaq.externalGaqID = '';
			  _dm_gaq.gaAggregatedEventAttributes = {
				  'site_alias':  _dm_gaq.siteAlias,  'product': 'DM_DIRECT',  'plan': 'SoLocal_Premium_Migration',  'dfooter': 'false',  'sitetype': '1',  'pwaEnabled': 'true'  
			}
			  _dm_gaq.pushEvent = function(trackingId, event, category, label, value, additionalParams) {
				var initialProps = {
					  send_to: trackingId,  event_category: category,  event_label: label,  value: value  
				}
				  additionalParams = additionalParams || {
				};
				var eventProps = $.extend({
				}
				, initialProps, additionalParams, trackingId === _dm_gaq.systemAggregatedGaqID?_dm_gaq.gaAggregatedEventAttributes:{
				});
				  gtag('event', event, eventProps);
				  
			}
			window.dataLayer = window.dataLayer || [];
			function gtag(){
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			  function pushInsiteImpressions(id) {
				  $.each(_dm_insite, function(idx, rule) {
					  _dm_gaq.pushEvent(id, 'insite_impression', 'insite', rule.ruleType + '__' + rule.ruleId);
					  
				});
				  
			}
			if(_dm_gaq.systemAggregatedGaqID){
				// track aggregated account
				tag('config', 'UA-7265702-9', {
					'send_page_view': false,'anonymize_ip': true,'transport_type': 'beacon','custom_map': {
						'dimension1': 'site_alias', 'dimension2': 'product', 'dimension3': 'dFooter', 'dimension4': 'sitetype'
					}
				});
				_dm_gaq.pushEvent('UA-7265702-9', 'page_view');
				pushInsiteImpressions(_dm_gaq.systemAggregatedGaqID);
			}
			if(_dm_gaq.externalGaqID && _dm_gaq.externalGaqID!= '') {
				gtag('config', 'null', {
					'send_page_view': false,'anonymize_ip': true,'transport_type': 'beacon','linker': {
						'domains': ['actuelle-coiffure.com']
					}
				});
				_dm_gaq.pushEvent('null', 'page_view');
				pushInsiteImpressions(_dm_gaq.externalGaqID);
			}