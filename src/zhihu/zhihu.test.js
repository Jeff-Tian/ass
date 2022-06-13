const zhihu = require('./zhihu')

describe('zhihu', () => {
    it('is zhihu zvideo url', () => {
        expect(zhihu.isZVideoUrl('https://www.zhihu.com/zvideo/1518914371601895424')).toBe(true);
    })

    it('is NOT zhihu zvideo url', ()=>{
        expect(zhihu.isZVideoUrl('https://bilibili.iiilab.com/')).toBe(false);
    })
})