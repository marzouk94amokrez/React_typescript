function MandatoryMarker({color}) {
    if(color) {
        return <span style={{color:color, paddingLeft: "5px"}}>*</span>
    }else
    return <span style={{color:"red", paddingLeft: "5px"}}>*</span>
}

export default MandatoryMarker
