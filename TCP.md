

### 计算机通信原理

![tcp思维导图](./assets/images/tcp-x-mind.png)

在互联网中，两台计算机之前的通信便是通过TCP/IP协议进行的。

TCP: `Transmission Control Protocol` 传输控制协议

IP: `Internet Protocal` 网际协议

> 维基百科：
> TCP/IP 协议族是一个网络通信模型，以及一整个网络传输协议家族，为互联网的基础通信架构。该协议家族的两个核心协议：TCP（传输控制协议）和IP（网际协议）。（http协议也属于TCP/IP协议族）

TCP/IP协议一共有四层。从上到下分别是：应用层，传输层，网络层，数据链路层。在网络通信中，通过分层能够更好的将职责进行分离，能够每一层之间如果出现改动依然能够互不影响。

  模型层 | 主要概念
------------ | -------------------------------------
应用层(HTTP/FTP) | 应用层决定了向用户提供应用服务时通信的活动。HTTP/FTP协议就对应传统OSI模型中的`应用层`、`表示层`、`会话层`
传输层(TCP/UDP) | 提供端对端的接口，提供处于网络连接中的两台计算机之间的数据传输的规则。在传输层使用的协议主要有 TCP(传输控制协议)、UDP(用户数据协议) 等 
网络层(IP/ARP) | 网络层用来梳理网络上流动的数据包，数据包是网络传输的最小数据单位。该层规定了通过怎么样路径到达对方计算机，并将数据包传输给对方。IP 协议便是在这层工作。
链路层 | 识别硬件上唯一的MAC地址，用来处理连接网络的硬件部分。包括操作系统、驱动等。


### TCP: 提供可靠的字节流服务

TCP协议(传输控制协议)是在传输层工作的规则。所谓的字节流服务（Byte Stream Service）是指，为了方便传输，将大块数据分割成以报文段（segment）为单位的数据包进行管理。而可靠的传输服务是指，能够把数据准确可靠地传给对方。一言以蔽之，TCP协议为了更容易传送大数据才把数据分割，而且TCP协议能够确认数据最终是否送达到对方。


#### 三次握手

确保数据能到达目标。为了准确无误地将数据送达目标处，TCP协议采用了**三次握手（three-way handshaking）** 策略。用TCP协议把数据包送出去后，TCP不会对传送后的情况置之不理，它一定会向对方确认是否成功送达。所谓三次握手是指建立一个 TCP 连接时需要客户端和服务器端总共发送三个包以确认连接的建立。在socket编程中，这一过程由客户端执行connect来触发。

握手过程中使用了TCP的标志（flag）—— `SYN（synchronize）` 和`ACK（acknowledgement）`。

![tcp三次握手](./assets/images/三次握手.png)

1. 客户端将标志位SYN置为1，随机产生一个值seq=J，并将**该数据包发送给服务器端** ，客户端进入`SYN_SENT`状态，等待服务器端确认。
2. 服务器端收到数据包后由标志位SYN=1知道客户端请求建立连接，服
务器端将标志位SYN和ACK都置为1，ack=J+1，随机产生一个值seq=K，并将**该数据包发送给客户端以确认连接请求** ，服务器端进入`SYN_RCVD`状态。
3. 客户端收到确认后，检查ack是否为J+1，ACK是否为1，如果正确则将标志位ACK置为1，ack=K+1，**并将该数据包发送给服务器端**，服务器端检查ack是否为K+1，ACK是否为1，**如果正确则连接建立成功**，客户端和服务器端进入ESTABLISHED状态，完成三次握手，*随后客户端与服务器端之间可以开始传输数据了。*

若在握手过程中某个阶段莫名中断，TCP协议会再次以相同的顺序发送相同的数据包。除了上述三次握手，TCP协议还有其他各种手段来保证通信的可靠性。

#### 四次挥手

四次挥手即终止TCP连接，就是指断开一个TCP连接时，**需要客户端和服务端总共发送4个包以确认连接的断开**。在socket编程中，这一过程由客户端或服务端任一方执行close来触发。

由于TCP连接是双方的，因此，每个方向都必须要单独进行关闭，这一原则是当一方完成数据发送任务后，发送一个`FIN`来终止这一方向的连接，收到一个FIN只是意味着这一方向上没有数据流动了，即不会再收到数据了，但是在这个TCP连接上仍然能够发送数据，直到另一方向也发送了`FIN`。首先进行关闭的一方将执行主动关闭，而另一方则执行被动关闭。

中断连接端可以是客户端，也可以是服务器端。

![tcp四次挥手](./assets/images/四次挥手.png)

第一次挥手：客户端发送一个`FIN=M`，用来关闭客户端到服务器端的数据传送，客户端进入`FIN_WAIT_1`状态。意思是说"我客户端没有数据要发给你了"，**但是如果你服务器端还有数据没有发送完成，则不必急着关闭连接，可以继续发送数据。**

第二次挥手：服务器端收到`FIN`后，先发送`ack=M+1`，**告诉客户端，你的请求我收到了，但是我还没准备好，请继续你等我的消息。** 这个时候客户端就进入`FIN_WAIT_2`状态，继续等待服务器端的FIN报文。

第三次挥手：**当服务器端确定数据已发送完成，则向客户端发送FIN=N报文，告诉客户端，好了，我这边数据发完了，准备好关闭连接了。** 服务器端进入`LAST_ACK`状态。

第四次挥手：客户端收到`FIN=N`报文后，就知道可以关闭连接了，但是他还是不相信网络，怕服务器端不知道要关闭，所以发送`ack=N+1`后进入`TIME_WAIT`状态，如果Server端没有收到ACK则可以重传。服务器端收到ACK后，就知道可以断开连接了。客户端等待了2MSL后依然没有收到回复，则证明服务器端已正常关闭，那好，我客户端也可以关闭连接了。最终完成了四次握手。



> 参考： 
> 
> 《图解HTTP》
> 
> https://www.jianshu.com/p/9f3e879a4c9c
>