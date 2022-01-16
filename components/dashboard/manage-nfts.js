import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Image from 'next/image'

function NftItem({ nft, index }) {
    return (
      <Draggable draggableId={nft.id} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='flex my-10 shadow-lg p-4 rounded-2xl border bg-white'
          > 
                <div className='flex items-center pr-4'>
                    <Image src='/images/burger.png' width={20} height={20}/>
                </div>
              <img className="w-32 rounded-2xl" src={nft.image} />
              <div className='flex flex-col justify-between pl-4'>
                <div>
                    <p>{nft.collection}</p>
                    <p className='font-bold text-2xl'>{nft.name}</p>
                </div>
                <div>
                    <p>{nft.price} ETH</p>
                </div>
              </div>
          </div>
        )}
      </Draggable>
    );
  }

const NftList = React.memo(function NftList({ nfts }) {
    return nfts.map((nft, index) => (
      <NftItem nft={nft} index={index} key={nft.id} />
    ));
  });
  

const ManageNfts = ({userNfts}) => {


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
        const items = Array.from(nfts);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateNfts(items);

    }
    
    return (
        <div className="w-full h-full flex justify-center">
            <div className='w-1/2'>
                <p className='font-semibold text-3xl pt-8'>Your NFTs</p>
                <p className='text-lg pt-2'>Customize how and where they appear on your page</p>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="list">
                        {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <NftList nfts={nfts} />
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

        </div>
    )
}

export default ManageNfts