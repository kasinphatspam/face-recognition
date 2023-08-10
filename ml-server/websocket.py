import asyncio
import websockets

PORT = 3003

print("Started server on listening port " + str(PORT))

async def echo(websocket, path):
    print("A client just connected")

    async for message in websocket:
        print("Recieved message from client: " + message)
        await websocket.send("Response: " + message)

start_server = websockets.serve(echo, "localhost", PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()