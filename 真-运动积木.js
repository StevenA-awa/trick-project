const extensionId = 'reallyMovetion';
const Blockly = ScratchBlocks;
const workspace = Blockly.getMainWorkspace()
class ReallyMovetion {
    getInfo() {
        return {
            id: extensionId,
            name: '真 · 运动积木',
            blocks: [
                {
                    opcode: 'movesteps',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '移动 [num] 步',
                    arguments: {
                        num: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: 'goto',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '移到x: [xpos] y: [ypos] ',
                    arguments: {
                        xpos: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        ypos: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                }
            ]
        };
    }
    movesteps({num}, util,context) {
        let currentBlockId = util.thread.peekStack();
        if (currentBlockId === extensionId+'_'+context.opcode){
            alert('请把此块拖出代码栏执行');
            return;
        }
        const currentBlock = workspace.getBlockById(currentBlockId);
        currentBlock.moveBy(num,0);
    }
    goto({xpos,ypos}, util,context) {
    try{
        let currentBlockId = util.thread.peekStack();
        if (currentBlockId === extensionId+'_'+context.opcode){
            alert('请把此块拖出代码栏执行');
            return;
        }
        const currentBlock = workspace.getBlockById(currentBlockId);
        const {x,y} = currentBlock.getRelativeToSurfaceXY()
        currentBlock.moveBy(xpos - x,ypos - y);
    }catch(e){alert(e)}
    }
}

Scratch.extensions.register(new ReallyMovetion());
