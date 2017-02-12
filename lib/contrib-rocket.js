'use babel';

import ContribRocketView from './contrib-rocket-view';

export default {

  contribRocketView: null,
  modalPanel: null,
  subscriptions: null,

  deactivate() {
    if(this.contribRocketView)
      this.contribRocketView.destroy();
  },

  consumeStatusBar(statusBar) {
    this.contribRocketView = new ContribRocketView(statusBar)
    this.contribRocketView.start()
  }

};
