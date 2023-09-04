import type { DataConnection, Peer } from "peerjs";

export interface PlayersConnectionType {
    peer: Peer | null;
    connection: DataConnection | null
    opponentPeerId: string | null
    playerPeerId: string | null;
    isConnectedToOpponent: boolean;
}
