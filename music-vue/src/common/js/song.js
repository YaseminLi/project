class Song{
    constructor({id,mid,singer,songname,album,duration,image,url}){
        this.id=id;
        this.mid=mid;
        this.singer=singer;
        this.songname=songname;
        this.album=album;
        this.duration=duration;
        this.image=image;
        this.url=url;
}
}

export  function createSong(musicData){
    return new Song({
        id:musicData.id,
        mid:musicData.mid,
        singer:filterSinger(musicData.singer),
        songname:musicData.name,
        album:musicData.album.name,
        duration:musicData.interval,
        image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
        url:musicData.url
    })
}
function filterSinger(singer){
    if(!singer){
        return '';
    }
    let ret=[];
    singer.forEach(item => {
        ret.push(item.name)
    });
    return ret.join('/')
}