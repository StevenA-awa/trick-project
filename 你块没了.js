
Extension = (() => {
    class Extension {
        constructor(id,name,blocks) {
            this.info = {
                id,
                blocks,
                name
            };
            for (const block of blocks) {
                this[block.opcode] = block.def;
                let styleId = id;
                if (id === "sound")styleId = "sounds";
                if (id === "procedures")styleId = "more";
                block.extensions ||= ["colours_" + styleId];
            }
        }
        getInfo() {
            return this.info;
        }
    }
    return (id, name, blocks) => new Extension(id, name, blocks);
})()
for (const ext of [
        Extension('control','控制', [{
            opcode: 'repeatZreo',
            blockType: Scratch.BlockType.LOOP,
            text: '重复执行 0 次',
            def: () => {}
        },
        {
            opcode: 'waitZero',
            blockType: Scratch.BlockType.COMMAND,
            text: '等待 0 秒',
            def: () => {}
        }]),
        Extension('event','事件', [{
            opcode: 'Your_blocks_are_gone',
            blockType: Scratch.BlockType.HAT,
            text: '你块没了',
            def: () => {}
        },
        {
            opcode: 'I_ate_your_blocks',
            blockType: Scratch.BlockType.HAT,
            text: '你块被我吃了',
            def: () => {}
        }]),
        Extension('looks','外观', [{
            opcode: 'dora',
            blockType: Scratch.BlockType.COMMAND,
            text: '🧑‍🦯',
            def: () => {}
        }]),
        Extension('motion','运动', [{
            opcode: 'wheelchair',
            blockType: Scratch.BlockType.COMMAND,
            text: '♿️',
            def: () => {}
        },
        {
            opcode: 'don_t_go_anywhere.',
            blockType: Scratch.BlockType.COMMAND,
            text: '哪也别去',
            def: () => {}
        }]),
        Extension('operators','运算', [{
            opcode: 'Pretend1add1',
            blockType: Scratch.BlockType.REPORTER,
            text: '1 + 1',
            def: () => 3
        },
        {
            opcode: 'Pretend800add800',
            blockType: Scratch.BlockType.REPORTER,
            text: '800 + 800',
            def: () => '16百'
        },
        {
            opcode: 'Pretend16sub9',
            blockType: Scratch.BlockType.REPORTER,
            text: '16 - 9',
            def: () => '16减9 6减9不够减 借1当10 等于'.repeat(20)+'...'
        }]),
        Extension('sound','声音', [{
            opcode: 'mute',
            blockType: Scratch.BlockType.COMMAND,
            text: '🔇',
            def: () => {}
        },
        {
            opcode: 'Don_t_play_any_sound',
            blockType: Scratch.BlockType.COMMAND,
            text: '什么声音都不播放',
            def: () => {}
        }]),
        Extension('sensing','侦测', [{
            opcode: 'nosensing',
            blockType: Scratch.BlockType.REPORTER,
            text: '什么都不侦测',
            def: () => ''
        }]),
        Extension('data','变量', (iter=>{
            let result = [];
            let count = 0;
            for (const i of iter) {
                result.push({
                    opcode: i,
                    blockType: Scratch.BlockType.REPORTER,
                    text: count.toString(),
                    def: (x => () => x)(count)
                });
                count++;
            }
            return result;
        })(["zero","one","two","three","four","five","six","seven","eight","nine","ten"])),
        Extension('procedures','自制积木', [{
            opcode: 'nomyblock',
            blockType: Scratch.BlockType.HAT,
            text: '还想自制？想path呢',
            def: () => {}
        }])
    ]) {
    Scratch.extensions.register(ext);
    //await wait(1000);
}

