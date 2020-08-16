import React, {useEffect, useState} from 'react';

const AppDropDown = (props) => {
    console.log("source count " + props.source.length)
    const [showDrpDwnList, togglePanel] = useState(false);
    const [isShowMoreOn, setIsShowMoreOn] = useState(false);
    const [displaySource, setDisplaySource] = useState(); 
    let [searchedValue, setSearchedValue] = useState();
    let [filteredSourceData, setFilteredSourceData] = useState();
    let drpdownTitle = props.drpDwnTitle ? props.drpDwnTitle : "Select a location";

    // while component mount 
    useEffect(() => {
        loadDropDownData()
    }, [isShowMoreOn]);

    // input change filter source
    function onChangeInput(filterText){
        // update not found value to the state
        setSearchedValue(filterText);

        // update filterd souce to the state
        let sourceData = props.source;
        if(filterText != "" && filterText != undefined){
            sourceData = sourceData.filter((item) => {
            let itemName = item.title.toLowerCase();
            return itemName.indexOf(filterText.toLowerCase()) !== -1
            })
            // if(sourceData.length == 0){
            //     var searchedValue = filterText;
            // }
            setFilteredSourceData(sourceData);
        }else{
            filteredSourceData = null;
            setFilteredSourceData(props.source);
        }
        //setFilteredSourceData(sourceData);
        loadDropDownData();
    }

    // loading dropdow list item default/maxlimig and after filtered logic
    function loadDropDownData(){
        let sourceData = filteredSourceData || props.source;
        if(props.maxLimit && !isShowMoreOn){ 
            sourceData = sourceData.filter((item,count) => count < props.maxLimit)
        }   
        setDisplaySource(sourceData);     
    }

    // more link click toggle flag
    function handlShowMore(){
        setIsShowMoreOn(!isShowMoreOn); 
    }
 
    // add new list item
    function addNewListItem(newItem){
        console.log(searchedValue);
        console.log(setSearchedValue);
        if(newItem!=""){
            let sourceData = props.source; 
            // update the new item on dropdown source
            let filteredSource=[];
            var newId = props.source.length + 1;
            let newItemObj = {
                id: newId,
                title: newItem,
                selected: true,
                key: 'location'
            }
            sourceData.push(newItemObj);
            setDisplaySource(sourceData);
        }
    }

    return (
        <div className="dd-wrapper">
            <div className="dd-header">
                <div className="dd-header-title">
                    {drpdownTitle}
                </div>
                <div className="dd-arrow" onClick={() => togglePanel(!showDrpDwnList) } >

                </div>
            </div>
            {showDrpDwnList && (
                <div className="dd-list-wrapper">
                    <div className="dd-list-search">
                        <input 
                            type="text" 
                            id="filter"
                            className="searchbox" 
                            placeholder="Search" 
                            onChange={(e) => onChangeInput(e.target.value)} />
                    </div>
                    <ul className="dd-list-items">
                        {(displaySource.length == 0) && 
                            <div>
                                <span className="widget__message">
                                    "{searchedValue}" not found
                                </span>
                                {props.addPrivilege && (
                                    <span className="buttonStyle01">
                                        <button 
                                         onClick={(e) => addNewListItem(searchedValue)}>
                                            Add & Select
                                        </button>
                                    </span>
                                )}   
                            </div>
                        }
                        {
                            displaySource.map((item, index) => (
                                <li 
                                 className="dd-list-item" 
                                 key={item.id}
                                 onClick={(e) => {
                                    props.onClickListItem(item);
                                 }}>
                                    {item.title}
                                </li>
                            ))
                        }
                        {(props.maxLimit && displaySource.length >= props.maxLimit) &&
                            <div className="moreLink" onClick={(e) => handlShowMore()}> 
                                {isShowMoreOn ? "less": "more" }...
                            </div>
                        }
                    </ul>
                </div>
            )}        
        </div>
    );
}

export default AppDropDown;