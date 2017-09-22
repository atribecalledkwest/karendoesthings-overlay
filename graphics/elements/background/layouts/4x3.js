/* global define TweenMax */
define([], function() {
	return {
		attach(self) {
			self.tl.add(function() {
				self.$.plate.style.backgroundImage = "url(img/masked/bg-4x3.png)";
			}).add(TweenMax.to({}, 0.35, {})).add(TweenMax.to(self.$.placeholder, 0.75, {
				opacity: 0
			}))
			return "attached";
		},
		detach(self) {
			self.tl.add(TweenMax.to(self.$.placeholder, 0.75, {
				opacity: 1
			}));
			return "detached";
		},
		name: "4x3"
	}
});
