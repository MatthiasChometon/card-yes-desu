import type { DataConnection, Peer } from "peerjs";

export interface PlayersConnectionType {
    connection: DataConnection | null
    opponentPeerId: string | null
    playerPeerId: string | null;
    isConnectedToOpponent: boolean;
    isHost: boolean | null;
}
