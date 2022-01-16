import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const NftItem = () => {
    
}

const NftList = ({userNfts}) => {


    const [nfts, updateNfts] = useState(userNfts);

    const finalSpaceCharacters = [
        {
          id: 'test1',
          name: 'Test1',
        },
        {
            id: 'test2',
            name: 'Test2',
          },
          {
            id: 'test3',
            name: 'Test3',
          },
    ]
    const [characters, updateCharacters] = useState(finalSpaceCharacters);

    function handleOnDragEnd(result) {
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items);

    }
    
    return (
        <div className="bg-gray-300 w-full h-full">
             <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                    {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <QuoteList quotes={state.quotes} />
                        {provided.placeholder}
                    </div>
                    )}
                </Droppable>
            </DragDropContext>

        </div>
    )
}

export default NftList