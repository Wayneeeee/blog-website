---
title: Layer 2 笔记/介绍
description: 侧链是一条链，二层协议没有链。侧链也是链，所以有节点，有共识机制，有存储板块，有区块。二层协议不是链，所以没有节点，没有共识机制，没有区块的概念。
slug: intro-of-layer2
authors: wayne
tags: [Layer2, DeFi, Ethereum]
image: https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F790b442d-eede-44b8-ba62-62b06710de84_1000x463.png
---

## 本文比较长，一共七个部分：

1. *通俗的方式理解 zkrollup 和 optimistic rollup*
2. *Plasma 的简单历史*
3. *数据可用性*
4. *派系之争 op*
5. *派系之争 zk*
6. *Immutable X*
7. *结论*

## **1. 通俗的方式理解 zkrollup 和 optimistic rollup**

> 侧链是一条链，二层协议没有链。侧链也是链，所以有节点，有共识机制，有存储板块，有区块。二层协议不是链，所以没有节点，没有共识机制，没有区块的概念。

Layer 2 没有区块的概念其实，也没有节点，也不需要共识机制，所以在 Layer2 方案的区块浏览器上，其实看不到区块的。现在去看 Arbitrum 的浏览器，还有一个 Bk，Block，仔细看看每个区块其实就是每个交易，具体请看截图。Layer 2 的运营者只负责把交易排个顺序然后拿去处理。而区块链的关键之处就在于对交易的排序工作。

<img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F9a570a23-2e41-4934-9009-8c9c426a30d8_1408x967.png" />

{/* truncate */}

比如知名的三明治攻击其实就是排序攻击。你要发起一笔交易，付了50刀 Gas 费，有人发现了这笔还没处理的交易（在 Mempool 里面），然后花100刀 Gas 费，做两笔交易，一笔是跟你一样的买你要买的币，第二笔就是把买到的币再卖给你。先买的价格低，后买的价格高。所以对方就用两笔交易把你的交易夹在中间，先把你要买的币买了，然后再提高价格卖给你。

你感受到的最后变贵了，交易的滑点，就是对方的利润。这个和 Uniswap V3 的精准单点流动性提供是一个意思（Just-in-time Liquidity）。

了解了交易这个排序的重要性之后，两个 Layer 2（zk 和 op） 方案的区别简单理解。

为了防止对 zk 和 op 不熟，再说一遍这两个的区别：

1. Zk 是零知识证明，先证明是没问题，然后再把数据传到主链。先查后干。
2. Op 是乐观接受，先把数据处理了传到主链，再等人来挑战，一周时间内没人证明是错的，那就是对的。干完再查。

换个通俗但是不严谨的方式理解。

既然排序那么重要，那负责排序的就说了：我现在给你两条路，一条呢是你就听我的，一大堆交易给我我来排序，处理完我把处理的结果关键数据传到主链。你们要是对数据有意见有想法，我给你们一周时间，找到证据，反正原始的交易数据都在（这个就叫做数据的可获得性，data availability），你们自己核对，有问题就举报我，或者觉得我搞错了举报。要是你们挑战成功，主链也会给你们解决问题。这样只要我不出问题，我处理起来的速度就贼快。排序嘛，多简单。

第二条路呢，就是我好好干，每一次排序交易处理我都记录一个证明，然后传到主链的交易都有一个证明。这样任何交易任何人任何时候都能够随时保证我干的工作没问题。但是缺点就是，每次我都要处理完事搞一个证明，这样很累。所以速度就会很慢，而且越是复杂的处理逻辑，我干的就越慢，这个你们要理解。

看完上面你应该你对两个二层协议的方案有了一个大概的认知，如果还不懂也没关系，后面还会更详细的说。在此之前，先讲讲过去沸沸扬扬的 Plasma 的扩容之路。

## **2. Plasma 的历史**

稍微过一下 Plasma 的历史。其实一开始以太坊在 2017 年的最火热的时候就很堵，那时候就已经有关于扩容方案大量讨论的了。Plasma 是第一个受到非常大关注的方案。因为提出人是 V 神，还有来自 Lightning 的 Joesph Poon。

<img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fd446d8e3-4545-4266-b5be-ca49e144238c_1120x382.png" />

第一个版本的 Plasma 叫做 Plasma MVP（Minimal Viable Plasma）。这个版本肯定是行不通失败了。第一个版本大概就是把一大堆交易按照特定的规则排列，然后一起处理（其实后续的改进很多都是对这些一批次一批次交易的数据存储结构做改进）。

那么 MVP 的问题在哪里呢？还记得上面说的负责交易排序的人吗？这个人在二层协议里就是操作员，二层协议需要考虑到操作员作恶的情况。所以 zk 是操作员每笔留下一个证明，op 是操作员有一段时间的被挑战期。MVP 的问题在于：

1. 挑战期依然存在，一周；
2. 如果考虑到操作员作恶，发起挑战的时候需要把所有（注意，是所有，不是沿着默克尔树验证一条线）的交易全部验证一遍才能核查；

后来 V 神又做了一个新的版本，Plasma Cash。改变了交易集合的数据结构，同时还把资产都用非同质化通证来表示。这样其实就解决了核查是要检查所有人的所有交易问题。但是新的问题也出现了，用户提现的时候需要证明自己的拥有权，在挑战期用户需要定期在线。此外在存储方面，Plasma 对用户的要求也比较高，要自己存下来所有的数据。最终结果就是失败了。

## **3. 数据可用性**

你发现了吗？zk 是把结果和对结果的证明加密后小部分数据传到主网，来证明结果没问题；op 也是要把结果和原始的记录传到主网，如果有挑战能够有证据可查。

说到底，二层协议最后，甚至到扩容方案都是数据可用性的问题。理解数据可用的最好方式是从主网的角度，主网的节点能不能获得这些数据，并且是无条件的相信，也就是说二层协议处理的交易数据不能够存在中心化服务器或者什么地方。

以太坊主网把所有的数据都放在链上，任何人都能看能查，所以安全。但是这样就慢、效率低。侧链的解决方案比较彻底，直接搞个新的，侧链的数据上侧链，跟主链无关，所以主链的安全性跟侧链是独立的。这也是为什么很多人普遍觉得二层协议才是最好的扩容方案。因为二层协议能够利用主链的安全性。

在数据可用性方面，二层协议都把数据量减少，一个是给（跟主链比）比较少能证明交易没问题的数据；一个是不给数据但是请你相信我，要不然就挑战我然后我让你相信我。并且挑战的时候数据都是可用的，而且验证过程相比于历史的方案比较简单。

现在再回头看看还是 V 神的这个推文：

<img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fbfd44003-e081-4cf7-981f-1e3dafff70f3_1192x908.png" />

其中 SNARKs 和 STARKs 都是零知识证明的方向，具体含义有兴趣自己可以查查。Fraud proofs 就是之前说的乐观的 rollup，直接翻译叫做欺诈证明，其实就是之前说的挑战 --- 拿出证据来证明交易有问题存在欺诈行为。

而下面的两行就是在说数据可用性，on-chain 就是说二层的交易集合的数据对主网来说是可用的，而 off-chain 则是说二层交易集合的数据对主网来说是未知的，不可用。

图中的 validium 之前没有提到过，这里解释一下。validium 就是在 zkrollup 的基础上，再把要传到主链的部分数据舍弃，让数据量更少，这样交易处理起来也更快，还能达到交易免费执行的程度（这个下面还会细说，因为 ImutableX 用的就是这个）。

所以顺着这个图，也就是我们今天比较熟悉，也是文章一开始说的两类扩容方案，zk 和 op。

op 熟悉的人可能更多，主要是因为 Arbitrum 和 optimistic 两个上线，并且有很多项目（特别是土狗项目）。而 zk 方案其实也挺多项目，比如说 dydx，immutable X，gitcoin 捐赠的支付方式等。

## **4. 派系之争 op**

啥啥都有派系，区块链也是一样。看开点，炒币炒的不是涨跌，是人情世故。

就好像二层协议有 zk 和 op 两个派系一样，zk 和 op 内部也都有各自的派系之争。

op 的上面说了，就是 arbitrum 和 optimistic，两个目前都已经上线。很明显 arbitrum 发展的更好，截止到目前为止，arb 一共处理了三百多万笔交易。而 optimistic 则只处理了二十多万笔交易。但是！optimistic 的浏览器做的更好一点，这个必须要说。

<img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F0a55ebd4-94bd-4bbe-b499-f6087d786c66_1280x661.png" />

非常直接地告诉了是交易批次，不是区块。而右边的一层和二层的交易是要完全按照主链的规则记录在主链，所以右边有 Bk，区块的标识。相比于 arbitrum 确实用心很多。

Arbitrum 和 optimistic 的部分信息对比：

<img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F4c0d7f49-e5e9-42d4-a62b-cbedf9850a88_762x262.png" />

从目前的情况来看，两个对比，Arbitrum 目前确实领先许多。

最近 Optimistic 做了一次追溯性奖励计划，给生态中的项目发放奖励。收到奖励的项目一共有60个，一共100万美元。仔细看看这些项目，基本上都是非常非常技术类型的项目，而非应用类型会发币的项目。V 神前两天还写了一篇回顾，点评 Optimistic 的追溯奖励做的非常棒，项目总体的质量比 Gitcoin 11 期的还要高。这些技术类型的基础设施对于以太坊生态发展尤为关键。

再仔细看 Opitmistic 的动态，一周前才刚刚完成链网络升级，而唯一地址数的飙升也是最近几天刚刚发生。在此之前 Optimistic 上甚至都可以用没有什么应用来形容。而 Arbirtum 从九月份上线后并没有停机维护过，目前的主要动态就是和更多的项目合作，让更多的应用部署到二层上。

不得不说，早期在 Arbitrum 出现的土狗项目对于用户和资金的吸引起到了很大的作用。

多说一句，币安刚刚支持了 Arbitrum ETH 的充值和提现。这样以后从 Arbitrum 上提 ETH 应该都不用等七天了。在此之前还有一个可以用折价换流动性的方法，有协议提供这样的服务。就是如果你想提1个 ETH，还不想等七天。可以直接立刻提 0.98 个 ETH。或者说直接在主网借0.98个 ETH。等7天后，你的 ETH 提出来再还回去。

因为本身二层出错是个概率事件，只要用户的折价的收益能够弥补错误率乘以总提现额，这个就跑得通。

## **5. 派系之争 zk**

zkRollups 主要两个派系，分别是 Matter Labs 开发的 zkSync 方案和 Starkwave 开发的 StarkEx 方案。其中 zkSync 目前有两代，分别上 zkSync1 和 zkSync2；Stark 那边则分别是 StarkEx 和 Stark Net 两代。

这几个的区别 Immutable X 的 CTO 做了非常清晰明了的解释：

> ***For networks that you can play with right now, StarkEx is live with four applications, DyDx and DiversiFi for trading, and ImmutableX and Sorare for NFTs. zkSync is live for payments with primitive NFT functionality featured with ZKNFT.***

> StarkEx 已经上线，有支持交易方面的 dYdX，DiversiFi；还有 ImmutableX 和 Sorare 做 NFT。而 zkSync 那边则是支付方面已经成熟，zkNFT 则是解决 NFT 方面的问题。

如果还不明白，可以看下面的这个表格

<img  src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F5d4d21cc-bc2c-4f2d-9c7c-f974cd1877e1_699x454.png" />

关于两个 zkrollups 的开发团队信息：

<img  src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fc7206888-d041-4cfc-a8bd-df0b93356806_841x447.png" />

目前这两个对比下来，也很明显是 StarkWave 这边更胜一筹。目前利用 StarkEx 技术方案的项目之前也提到了，知名的爆款 dydx，immutablex，deversifi，sorare。根据 StarkWave 官网的数据，利用自己方案项目的总锁仓额已经超过了十亿美元，交易超过了5100万笔，累计交易量超过了2150亿美元。

其他在应用和未来发展规划方面的对比，前两天 Bankless 发了一篇文章《The best comparison on zkRollups today》，很详细介绍了这部分内容，中文也已经有很多翻译，有兴趣可以去找找看。

## **6. Immutable X**

特别提一下 IMX，一个声势浩大的二层协议，啥也没干先把币发了。

IMX 用的是和 dydx 差不多的方案，也就是 zkrollups，这都没啥。重点是因为游戏链，道具装备人物肯定都是 NFT，虽然 rollups 比主网便宜很多，但是如果是规模很大的游戏，一样会超级贵，多了还是会用不起。为了解决这个问题，IMX 就更激进，直接用了上面提到 validium 方案。

Validium 和正常的 zkrollups 的区别就是完全抛弃了数据可用性，打一个简单的比方去理解就是。

我们把文章一开始例子里面操作员要做的事情是批改学生的试卷。

> Zkrollups 的方式是，操作员每批改完一份试卷，就把批改结果和试卷的照片拍个照，然后一起上传到主网上。这样大家直接就能看到考试分数。如果对考试分数有意见，直接看试卷的照片，看看自己是哪里错了批改没有问题。而 validium 是直接把结果分数传上去，试卷照片不传。也就是抛弃了一部分的数据。对于主网来说，是找不到试卷在哪里的，如果有意见，也没办法申诉，因为没有试卷不知道错在哪里。再说一遍，这个就是抛弃了数据可用性，Data Availability。但是这样会让整个批改过程（交易处理）变得贼快。为了让用户放心，IMX 又搞了个委员会，定期把试卷照片传到其他地方，就是 IPFS。

但是传到任何地方都没用，只有在主网的区块链里面的数据，才是真的区块链。放在其他地方再安全，他也不是所谓的 crypto native。

当然，IMX 也知道这个，所以用户未来直接在做交易的时候，可以选择是正常的 zkrollups 或者 validium。按照官方的说法：“我们把选择交给用户。”

> *We’re allowing users to choose between two Validium and ZK-rollups via a system known as “Volition”, and we’re starting by offering maximum scalability via Validium to allow applications to scale NFTs to the billions, all while remaining on Ethereum. Let’s go!*

讲实话，虽然能够理解这样的妥协。但是用户知道个啥啊，交给用户不一定是个好的选择。

## **7. 结论**

本篇其实没有什么结论，更多的就是一个科普/介绍/讨论/笔记。因为涉及到二层协议，这是一个比较大赛道，技术设计架构方面也都比较复杂，我也不是技术出身所以必然有很多地方理解不到位。目的就是能够让一部分人大概能知道自己如果买了这些或者在这些协议活动，干的是个什么事情。

加之最近中文内容有些不太平，中文非广告的内容可能越来越少，就整理了一个出来。

***

**参考材料**

1. [*https://arbiscan.io/chart/verified-contracts*](https://arbiscan.io/chart/verified-contracts)
2. [*https://optimistic.etherscan.io/*](https://optimistic.etherscan.io/)
3. [*https://www.crunchbase.com/organization/optimism/company\_financials*](https://www.crunchbase.com/organization/optimism/company_financials)
4. *Offchain Labs - Employees, Board Members, Advisors & Alumni*
5. [*https://www.crunchbase.com/organization/offchain-labs/people*](https://www.crunchbase.com/organization/offchain-labs/people)
6. [*https://vitalik.ca/general/2021/11/16/retro1.html*](https://vitalik.ca/general/2021/11/16/retro1.html)
7. [*https://dune.xyz/eliasimos/Bridge-Away-(from-Ethereum)*](https://dune.xyz/eliasimos/Bridge-Away-\(from-Ethereum\))
8. [*https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad*](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad)
9. [*https://www.crunchbase.com/search/funding\_rounds/field/organizations/last\_funding\_type/matter-labs*](https://www.crunchbase.com/search/funding_rounds/field/organizations/last_funding_type/matter-labs)
10. [*https://www.crunchbase.com/organization/starkware-industries-ltd*](https://www.crunchbase.com/organization/starkware-industries-ltd)
11. [*https://newsletter.banklesshq.com/p/the-best-comparison-on-zkrollups*](https://newsletter.banklesshq.com/p/the-best-comparison-on-zkrollups)
12. [*https://dune.xyz/ChainsightAnalytics/Uniswap-v3-Just-in-Time-(JIT)-Liquidity-MEV*](https://dune.xyz/ChainsightAnalytics/Uniswap-v3-Just-in-Time-\(JIT\)-Liquidity-MEV)