
### reactDom.render() 版本 16.8.6

在方法体中直接调用`legacyRenderSubtreeIntoContainer()` 将元素绘制到`container上`，此时的container就是我们传入的`document.getElementById('#root')`节点

``` javascript
  render(
    element: React$Element<any>,
    container: DOMContainer,
    callback: ?Function,
  ) {
    // 1. 第一步 执行 legacyRenderSubtreeIntoContainer
    return ((parentComponent, children, container, callback) => {
      // 1.1 创建root节点，并赋值给container
      root = container._reactRootContainer = legacyCreateRootFromDomContainer(container)

      function legacyCreateRootFromDomContainer() {
        // 1.1.1 
        class ReactRoot {
          constructor(container) {
            // 1.1.1.1 创建 fiberRoot
            // createContainer = react-reconciler.createFiberRoot(container)
            // 其实就是创建fiberRoot
            this.root = createContainer(container)
            this._internalRoot = root
          }
        }

        return new ReactRoot(container)
      }
      
     
      // 1.2 
      // 执行 root.render(children, callback)，其实就是调用一下 Reconciler 中的 updateContainer
      // children 就是react元素
      const fiberRoot = root._internalRoot
      updateContainer(children, fiberRoot, null, callback);
    })(null,
      element,
      container,
      false,
      callback,)
  }
```

####  `updateContainer` 更新fiber节点。源码：`react-reconciler/src/ReactFiberReconciler` 版本：17.0.1

``` javascript

export function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  callback: ?Function,
): Lane {
  // 1. 更新时间
  // lane 是 react 17 中新加入的，用来管理调度的，代替了16中的expirationTime
  const current = container.current;
  // eventTime 执行时间
  const eventTime = requestEventTime();
  const lane = requestUpdateLane(current);
  
  // 2. 给context赋值
  // 在 ReactDom.render时，parentComponent为null，这里会直接返回一个空对象 {}
  // 所以相当于 context = {}
  const context = getContextForSubtree(parentComponent);
  container.context = context;
  
  // 3. 创建一个更新 并将这个update加入到fiber.updateQueue
  // createUpdate 返回一个 Update类型的对象

  // 3.1 update = createUpdate() ==>>
  // const update = {
  //   // react 16中的
  //   eventTime,
  //   lane,

  //   // 常量 标志位，UpdateState = 0
  //   tag: UpdateState,
  //   payload: null,
  //   callback: null,

  //   next: null,
  // };

  const update = createUpdate(eventTime, lane)
  // Caution: React DevTools currently depends on this property
  // being called "element".
  // 当前更新的react元素
  update.payload = {element};

  // 3.2 将 update 加入到 fiber.updateQueue 中。updateQueue 是一个环形队列
  enqueueUpdate(current, update);

  // 4.将当前fiber放入调度器，调度器会负责调度优先级的管理，react调度策略的核心部分
  scheduleUpdateOnFiber(current, lane, eventTime);

  return lane
}

```

#### scheduleUpdateOnFiber

`ReactDOM.render`时核心的代码

``` javascript
function scheduleUpdateOnFiber(
  fiber: Fiber,
  // lane 是17中新引入的优先级处理的结构
  lane: Lane,
  eventTime: number,
) {

  // root = fiber.stateNode 是真实节点，对于RootFiber来说的话，指向的是FiberRoot
  // 1.更新的Lane，并且返回FiberRoot
  const root = markUpdateLaneFromFiberToRoot(fiber, lane);
   
    function markUpdateLaneFromFiberToRoot(
      sourceFiber: Fiber,
      lane: Lane,
    ): FiberRoot | null {
      // Update the source fiber's lanes
      // 更新fiber的lanes
      sourceFiber.lanes = mergeLanes(sourceFiber.lanes, lane);

      // alternate 替补、互生； 顾名思义就是当前fiber节点的互生节点，react fiber使用了双缓存的结构
      // 在react中最多会同时存在两颗fiber树，一个用于当前内容的显示称谓`current Fiber树`，另一个用于内存中正在构建的称谓`workInProgress Fiber树`
      // 两棵`fiber树`的节点，互相对应，并且通过`alternate`属性进行连接。
      let alternate = sourceFiber.alternate;
      if (alternate !== null) {
        alternate.lanes = mergeLanes(alternate.lanes, lane);
      }

      // Walk the parent path to the root and update the child expiration time.
      // 递归更新所有子节点和祖先节点的lane
      let node = sourceFiber;
      let parent = sourceFiber.return;
      while (parent !== null) {
        parent.childLanes = mergeLanes(parent.childLanes, lane);
        alternate = parent.alternate;
        if (alternate !== null) {
          alternate.childLanes = mergeLanes(alternate.childLanes, lane);
        } else {
          if (__DEV__) {
            if ((parent.flags & (Placement | Hydrating)) !== NoFlags) {
              warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber);
            }
          }
        }
        node = parent;
        parent = parent.return;
      }

      if (node.tag === HostRoot) {
        // stateNode => Fiber对应的真实DOM节点
        const root: FiberRoot = node.stateNode;
        return root;
      } else {
        return null;
      }
    }

  // 标记root有待处理的更新
  markRootUpdated(root, lane, eventTime);

  // 获取优先级
  const priorityLevel = getCurrentPriorityLevel()

  // Register pending interactions on the root to avoid losing traced interaction data.
  // 将交付数据注册到根节点，避免丢失数据
  // 初次渲染时，不执行
  schedulePendingInteractions(root, lane);

  // This is a legacy edge case. The initial mount of a ReactDOM.render-ed
  // root inside of batchedUpdates should be synchronous, but layout updates
  // should be deferred until the end of the batch.
  // 真正的渲染入口，开始渲染这个节点
  performSyncWorkOnRoot(root);

  mostRecentlyUpdatedRoot = root
}
```