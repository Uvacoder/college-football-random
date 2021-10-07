import React, {useEffect} from 'react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { Text, Flex, Avatar } from '@chakra-ui/react'



function DropDown({filesObject, parentCallback}){
  
    const [pickerItems, setPickerItems] = React.useState(filesObject);
    const [selectedItems, setSelectedItems] = React.useState([]);
  


    const onTrigger = (event) => {
      parentCallback(selectedItems);
  }


  useEffect(() => {
    console.log(selectedItems)
    onTrigger()

    
}, [selectedItems]);

  
    const handleSelectedItemsChange = (selectedItems) => {
      
      if (selectedItems.length>1) {
        var z = selectedItems.shift()
        
        setSelectedItems(selectedItems);
      }else{
          setSelectedItems(selectedItems);
        }
 
        
      };

      const customRender = (selected) => {
        return (
          <Flex flexDir="row" alignItems="center">
            <Avatar mr={2} size="sm" name={selected.label} bg={selected.color} color={"#F8F8FF"} />
            <Text>{selected.label}</Text>
          </Flex>
        )
      }

      

  return (
    <CUIAutoComplete
          label="Choose your team"
          placeholder="Type Out A Team"
          items={pickerItems}
          disableCreateItem={true}
          selectedItems={selectedItems}
          listStyleProps = {{ 
              maxH: '120px',
              overflow: 'scroll'
          }}
          itemRenderer={customRender}
          onSelectedItemsChange={(changes) =>
            handleSelectedItemsChange(changes.selectedItems)
          }
        />
  );
}


  export default DropDown

