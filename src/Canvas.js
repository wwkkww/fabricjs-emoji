import React, { Component } from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { fabric } from 'fabric';
import { Smile } from 'react-feather';
import { Picker, Emoji } from 'emoji-mart';


class Canvas extends Component {
  constructor(props) {
    super(props);
    this.textRef = React.createRef();

    this.state = {
      message: '',
      showEmojiPicker: false
    }
  }


  componentDidMount() {
    this.canvas = new fabric.Canvas('c', { backgroundColor: 'yellow' })
  }

  onMessageChanged = event => {
    this.setState({ message: event.target.value })
  }

  onEnterPress = (e) => {
    // console.log('onEnterPress')
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      // this.onSendMessage(e);
      const textObject = new fabric.IText('Enter text here...', textOptions);
      textObject.text = this.state.message
      this.updateCanvas(textObject)
      this.setState({message : ''})
      console.log('send message')
    }
  }

  updateCanvas(textObject) {
    this.canvas.add(textObject).setActiveObject(textObject);
    this.canvas.renderAll()
  }

  toggleEmojiPicker = () => {
    this.setState({ showEmojiPicker: !this.state.showEmojiPicker })
  }

  addEmoji = (emoji) => {
    console.log('add emoji', emoji)

    const text = `${this.state.message}${emoji.native}`;
    this.setState({
      message: text,
      showEmojiPicker: false,
    });
    this.textRef.current.focus()
  }

  fadeOutObject = () => {

    // const circle = new fabric.Circle({ radius: 20, fill: 'red', left: 100, top: 100 });
    // this.canvas.add(circle);
    // this.canvas.setActiveObject(circle);

    const thumbsUp = new fabric.IText(String.fromCodePoint(0x1F44D), praiseOptions);
    this.canvas.add(thumbsUp);
    this.canvas.setActiveObject(thumbsUp);

    let activeObj = this.canvas.getActiveObject();

    // activeObj.setOpacity(1);
    activeObj.set('opacity', 1)

    activeObj.animate('opacity', '0', {
      duration: 3000,
      // onChange: this.canvas.renderAll(),
      onChange: () => this.canvas.requestRenderAll(),
      onComplete: () => {
        this.canvas.getActiveObjects().forEach((obj) => {
          this.canvas.remove(obj)
        });
        // this.canvas.remove(activeObj);
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <Emoji emoji='+1' set='apple' size={60} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <canvas id="c" width="900px" height="500px"></canvas>
        </div>
        <div>
          {
            this.state.showEmojiPicker ?
              (
                <Picker
                  onSelect={this.addEmoji}
                  showPreview={false}
                  showSkinTones={false}
                  native={true}
                  emoji='point_up'
                />
              ) : null
          }
        </div>
        <div style={{ border: 'all', borderRadius: '5px', borderColor: '#bsbsbs', borderWidth: '2px'}}>
          <textarea
            ref={this.textRef}
            className=""
            style={{ border: 'none', height: '100px', outlineStyle: 'none', paddingRight: '10%', width: '300px', marginTop: '50px', fontFamily: 'inherit', fontSize: '25px' }} onKeyDown={this.onEnterPress}
            autoFocus
            placeholder="Type your message..."
            value={this.state.message}
            onChange={this.onMessageChanged}
          />
          <span>
            <button
              type="button"
              className="toggle-emoji"
              onClick={this.toggleEmojiPicker}
            >
              <Smile />
            </button>

            <button
              type="button"
              className="toggle-emoji"
              onClick={this.fadeOutObject}
            >
              Fade
            </button>
          </span>
        </div>
        
      </div>
    );
  }
}

export default Canvas;

const textOptions = {
  fontFamily: 'Helvetica',
  fontSize: 40,
  fontWeight: 'bold',
  fill: 'blue',
  left: 20,
  top: 20,
  radius: 10,
  borderRadius: '25px',
  hasRotatingPoint: true
};

const praiseOptions = {
  fontFamily: 'Helvetica',
  fontSize: 250,
  fontWeight: 'bold',
  fill: 'blue',
  left: 100,
  top: 100,
  radius: 10,
  borderRadius: '25px',
  hasRotatingPoint: true
};