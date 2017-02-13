'use babel';

import { CompositeDisposable } from 'atom'
import { exec } from 'child_process';

export default class ContribRocketView {

  constructor(statusBar) {
    this.statusBar = statusBar
    this.subscriptions = new CompositeDisposable()
  }

  start() {
    this.drawElement()
    this.initialize()
  }

  initialize() {
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-contrib-rocket:toggle': () => this.toggle()
    }))
  }

  execContribRocket(error, stdout, stderr){
    if (error !== null) {
      e = new Error()
      e.name = "Error executing contrib-rocket"
      e.message = stderr
      throw e
    }
    else{
      // We use slice to not grab the default rocket
      // provided by contrib-rocket, instead we use
      // atom's one.
      this.element.firstChild.textContent = stdout.slice(0, -3)
    }
  }

  drawElement() {
    this.element = document.createElement('div')
    this.element.id = 'contrib-rocket-element'
    this.element.className = 'inline-block'

    // The trail of the rocket
    let trailElem = document.createElement('span')
    trailElem.className='trail'

    // The contrib-rocket rocket, atom style
    let rocketElem = document.createElement('span')
    rocketElem.className='icon icon-rocket'

    this.element.appendChild(trailElem)
    this.element.appendChild(rocketElem)

    // the absolute path to contrib-rocket.sh
    let scriptPath = atom.packages.getPackageDirPaths()[0] +
      '/atom-contrib-rocket/node_modules/contrib-rocket/contrib-rocket.sh'

    child = exec(`${scriptPath} -d 7`, this.execContribRocket.bind(this));

    this.statusBar.addRightTile({
      item: this.element,
      priority: -1
    })
  }

  toggle() {
    let style = this.element.style.display
    this.element.style.display = style === 'none' ? '' : 'none'
  }

  destroy() {
    this.element.parentNode.removeChild(this.element)
  }

}
