var shouldMonitorImages =  false;
			if(shouldMonitorImages) {
				window.addEventListener('error', function(event) {
					if(event.target && event.target.tagName === 'IMG' && event.target.src && event.target.src.includes && event.target.src.includes('multiscreensite.com')) {
						if (!window.fetch){
							return;
						}
						try {
							return fetch('/_dm/s/rt/actions/log/WARN', {
								method: 'POST',headers: {
									'Content-Type': 'application/json'
								}
								,body: JSON.stringify({
									 data: {
										type: 'image failed to load',eventType: event.type,image: event.target.src,href: window.location.href
									}
									 
								}
								)
							});
						}
						 catch (error) {
							console.log(error);
						}
					}
				}
				, {
					 capture: true 
				});
			}